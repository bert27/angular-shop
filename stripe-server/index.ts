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

app.post(
  '/create-payment-intent',
  async (req: Request, res: Response): Promise<void> => {
    try {
      const { amount, currency } = req.body;

      // Validación de datos
      if (!amount || !currency) {
        console.error('Faltan datos requeridos');
        res.status(400).send('Faltan datos requeridos');
        return;
      }

      console.log('Datos recibidos para crear PaymentIntent:', { amount, currency });

      // Crear un PaymentIntent con confirmación automática
      const paymentIntent = await stripe.paymentIntents.create({
        amount, // El importe en céntimos (por ejemplo, 100 céntimos = 1 euro)
        currency,
        automatic_payment_methods: {
          enabled: true, // Habilita los métodos de pago automáticos
        },
      });

      console.log('PaymentIntent creado con éxito:', paymentIntent.id);
      res.json({ clientSecret: paymentIntent.client_secret }); // Devuelve el clientSecret al frontend
    } catch (error) {
      const errorMessage = (error as Error).message;
      console.error('Error al crear el PaymentIntent:', errorMessage);
      res.status(500).send(`Error: ${errorMessage}`);
    }
  }
);

// Iniciar el servidor
app.listen(port, () => {
  console.log(`Servidor escuchando en http://localhost:${port}`);
});
