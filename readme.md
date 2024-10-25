# V-Shop: E-Commerce Website

V-Shop is a modern e-commerce web application that allows users to browse products, add them to the cart or wishlist, and proceed through a secure checkout process. This project is built using **React** for the frontend, **Redux** for state management, and **Node.js** with **MongoDB** for backend and database.

## Features

- **Product Browsing**: View a list of products, filter, and search.
- **Product Detail Page**: Detailed view of individual products.
- **Shopping Cart**: Add, update, or remove products from the cart.
- **Wishlist**: Add products to the wishlist and move them to the cart.
- **Checkout Process**: Secure checkout with multiple shipping options.
- **Authentication**: Secure login and registration for users.
- **Responsive Design**: Fully responsive and works across all screen sizes.
- **Toast Notifications**: Interactive notifications for key actions (e.g., add to cart, remove from wishlist).

## Technologies Used

### Frontend

- **React**: JavaScript library for building user interfaces.
- **Redux**: State management for predictable state across the app.
- **Redux Toolkit**: Simplified Redux state management.
- **React Redux**: Official React bindings for Redux.
- **React Router**: Routing for navigating between pages.
- **Tailwind CSS**: Utility-first CSS framework for responsive design.
- **React Toastify**: Notifications for important actions (e.g., adding to cart).

### Backend

- **Node.js**: JavaScript runtime for the backend server.
- **Express.js**: Web framework for building APIs and handling requests.
- **MongoDB**: NoSQL database for storing products, users, and orders.
- **Mongoose**: ODM library for interacting with MongoDB.

### Tools & Other Libraries

- **Vite**: For creating the project.
- **ESLint**: Linting tool for keeping code consistent.
- **Prettier**: Code formatter to ensure a clean codebase.

## Project Structure

```bash
├── cient
|   ├── public                 # Public directory for static files
|   ├── src                    # Source code
|   │   ├── components         # Reusable UI components
|   │   ├── config             # Configuration variables
|   │   ├── custom hooks       # Custom hooks
|   │   ├── features           # Redux slices for managing application state
|   │   ├── pages              # Main pages for the app
|   │   ├── App.jsx            # Main App component
|   │   ├── Index.css          # Css file
|   │   ├── main.jsx           # root file
|   │   └── store.jsx          # Redux store
|   ├── index.html             # Html file
|   ├── tailwind.config.js     # Tailwind configuration file
|   └── package.json           # Project metadata and dependencies
|
|
├── backend
|   ├── controllers            # Business logic -> handling requests & responses.
|   ├── dev-data               # Sample data for development and testing.
|   ├── models                 # Mongoose shema and models.
|   ├── routers                # API routers
|   ├── utils                  # Utility functions
|   ├── app.js                 # Main Express application setup
|   ├── server.js              # Entry point to start the server & connect to DB.
|   └── package.json           # Project metadata, scripts, and dependencies.
|
├── readme.md                  # Project documentation & setup instructions
```

## Installation

### Prerequisites

- **Node.js:** Install the latest version from nodejs.org.
- **MongoDB:** Set up a MongoDB database locally or use MongoDB Atlas.

### 1. Clone the repository:

```bash
git clone https://github.com/your-username/v-shop.git
```

### 2. Install dependencies:

```bash
cd v-shop
npm install
```

### 3. Configure environment variables:

Create a .env file in the root directory.
Add the following variables to the .env file:

```bash
DATABASE=<Your MongoDB connection string>
DATABASE_PASSWORD=<Your MongoDB password>
PORT=3000
```

### 3. Start the development server:

```bash
npm start
```

### 4. Navigate to http://localhost:3000 in your browser to access the application.
