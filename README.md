# Ng-shop

This project is an Angular-based online shop that is currently under construction. At this stage, it includes the product views and shopping cart functionality only. 
The project is in Spanish.


<div style="display: flex; align-items: center; width: 100%;">
  <img src="public/screenshots/1.jpg" alt="Screenshot 1" style="width: 40%;">
  <img src="public/screenshots/2.jpg" alt="Screenshot 2" style="width: 40%;">
</div>



## Install

navigate to the project and write npm i

## Start the web to get started

Run `ng serve` for a dev server. Navigate to `http://localhost:3000/` Or click on Ejecutar.bat and it will start by itself (Windows).
The application will automatically reload if you change any of the source files.

--------------------------------------------------

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## How to modify products

To modify the products, go to `src/data/data`, where you can find `export const productsData = [ cardProduct1, cardProduct2, macMini, cardProduct4, cardProduct5 ] as ProductDataInterface[];`. By changing the properties of these objects, you can add your own products.

### Example

```javascript
export const cardProduct1 = {
  title: 'Iphone 16 pro',
  description: 'Smartphone 5G con Control de Cámara, grabación en 4K a 120 f/s con Dolby Vision.',
  stock: true,
  imageUrl: 'images-products/1.jpg',
  options: [
    {
      price: 1219, 
      tipo: "128Gb"
    },
    {
      price: 1540,  
      tipo: "256Gb"
    },
    {
      price: 1800,  
      tipo: "512Gb"
    }
  ]
};

