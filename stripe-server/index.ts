import express, { Request, Response } from 'express';
import Stripe from 'stripe';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const port = 4000;
const stripe = new Stripe(process.env['STRIPE_SECRET_KEY'] as string);

app.use(cors());
app.use(bodyParser.json());

// Route to create a payment session
app.post(
  '/create-checkout-session',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const session = await stripe.checkout.sessions.create({
        payment_method_types: ['card'],
        line_items: req.body.items, // You should send the array of items from the client
        mode: 'payment',
        success_url: 'http://localhost:3000/success',
        cancel_url: 'http://localhost:3000/cancel',
      });
      res.json({ id: session.id }); // Returns a JSON object
    } catch (error) {
      console.error(error);
      res.status(500).send('Error creating the payment session');
    }
  }
);

// Route to receive webhooks from Stripe
app.post(
  '/webhook',
  express.raw({ type: 'application/json' }),
  async (req: Request, res: Response): Promise<void> => {
    const sig = req.headers['stripe-signature'];

    if (!sig) {
      res.status(400).send('No webhook signature provided');
      return;
    }

    let event;

    try {
      event = stripe.webhooks.constructEvent(
        req.body,
        sig,
        process.env['STRIPE_WEBHOOK_SECRET'] as string
      );
    } catch (err) {
      const error = err as Error; // Specific type to access its properties
      console.error(`Webhook error: ${error.message}`);
      res.status(400).send(`Webhook error: ${error.message}`);
      return; // Make sure to return after sending the response
    }

    // Handle the event
    switch (event.type) {
      case 'checkout.session.completed':
        const session = event.data.object;
        console.log('Payment successful for session:', session.id);
        // Here you can handle the successful payment (e.g., update the database)
        break;
      default:
        console.warn(`Unhandled event: ${event.type}`);
    }

    res.json({ received: true }); // Response to the webhook
  }
);

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
