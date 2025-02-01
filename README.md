# Product Management APP

##  Introduction :
 - This was my Technical Assessment for Backend Engineer position **[@Unique Destination Travel Network](https://www.linkedin.com/company/unique-destination-travel-network/posts/?feedView=all)** company
 - you can access the task from here: [Assessment](https://drive.google.com/file/d/1i1-G4E77-ITegHgsJwp9eH8TrT-J3Jmr/view?usp=sharing). 
 - Postman collection: [Postman collection](https://drive.google.com/file/d/1KW0It53QBZxWlU4Q1unSBGJazyhoHJwZ/view?usp=sharing). <br><br>

## Description
The **Product Management APP** is a backend service built with **NestJS**, **MongoDB**, and **JWT Authentication**. It provides functionalities for managing products, users, and authentication mechanisms.

## Tools:
![Node.js](https://img.shields.io/badge/Node.js-18.0-green?logo=node.js)
![NestJS](https://img.shields.io/badge/NestJS-11.0-red?logo=nestjs)
![MongoDB](https://img.shields.io/badge/MongoDB-8.9-brightgreen?logo=mongodb)
![Jest](https://img.shields.io/badge/Jest-29.7-yellow?logo=jest)
![Prettier](https://img.shields.io/badge/Prettier-3.4-blue?logo=prettier)  <br><br>

## Features
- **Authentication** (JWT-based login and registration)
- **Role-Based Access Control (RBAC)** using **easy-rbac**
- **Product Management** (CRUD operations)
- **Deployment** on **Render**
- **Swagger API Documentation**
- **Unit & E2E Testing** using **Jest**

## Technologies Used
- **NestJS** (Backend Framework)
- **MongoDB** (Database)
- **Mongoose** (ODM for MongoDB)
- **JWT** (Authentication)
- **Swagger** (API Documentation)
- **Jest** (Testing)
- **ESLint & Prettier** (Code Quality)

## Installation

Clone the repository:
```sh
git clone <repository_url>
cd product_management
```

Install dependencies:
```sh
npm install
```

## Environment Setup
Create a `.env` file in the root directory and configure the following variables:
```
PORT=3000
MONGODB_URI=mongodb://localhost:27017/product_management
JWT_SECRET=your_secret_key
```

## Running the Application

### Development Mode
```sh
npm run start:dev
```

### Production Mode
```sh
npm run start:prod
```

## API Endpoints

### Authentication

|Endpoint|Method|Usage
|-------:|-----:|-----
|/api/v1/register|POST|Register a new user.
|/api/v1/login|POST|Authenticate a user and provide access to their account.

### Products

|Endpoint|Method|Usage
|-------:|-----:|-----
|/api/v1/products|GET|Get all products.
|/api/v1/products/:id|GET|Get a product by ID.
|/api/v1/products|POST|Create a new product.
|/api/v1/products/:id|PUT|Update a product by ID.
|/api/v1/products/:id|DELETE|Delete a product by ID.

## Database Schemas

### user schema: 

```JavaScript
{
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ['admin', 'user'], default: 'user' },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}
```

### product schema: 

```JavaScript
{
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  quantity: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
}
```

## API Documentation
Swagger documentation is available at:
```
https://product-management-wb8x.onrender.com/api#/
```

## Testing

### Run All Tests
```sh
npm test
```

### Run Specific Tests
```sh
npm run test:product
npm run test:auth
```

### Run End-to-End Tests
```sh
npm run test:e2e
```

## Linting & Formatting
```sh
npm run lint  # Lint the code
npm run format  # Format the code
```

---

<br><br>

<br><br>
## Notes: 
- You can run the project using two options:
  - Ensure MongoDB is running before starting the application.
  - Use Postman or similar tools to test API endpoints.
  - Keep your JWT secret key safe and do not expose it publicly.