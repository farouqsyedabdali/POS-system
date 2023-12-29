# POS System Project

## Description

This project is a Point of Sale (POS) system built using React for the frontend and Node.js/Express for the backend, with a MySQL database. It's designed to handle transactions, manage products, and provide admin functionalities.

## Features

- Product listing and management.
- Shopping cart functionality.
- Checkout process with transaction recording.
- Admin panel to view all transactions.
- Responsive design for various devices.

## Getting Started

### Prerequisites

- Node.js
- npm (Node Package Manager)
- MySQL

### Installation

1. **Clone the Repository:**
    ```bash
    git clone [repository URL]
    cd POS-system
    ```

2. **Install Backend Dependencies:**
    Navigate to the backend directory:
    ```bash
    cd pos-backend
    npm install
    ```

3. **Set Up the Environment Variables:**
    Create a `.env` file in the backend directory and fill in your database credentials:
    ```
    DB_HOST=localhost
    DB_USER=[your_username]
    DB_PASS=[your_password]
    DB_NAME=[your_db_name]
    PORT=3001
    ```

4. **Start the Backend Server:**
    ```bash
    node server.js
    ```

5. **Install Frontend Dependencies:**
    In a new terminal, navigate to the frontend directory:
    ```bash
    cd pos-frontend
    npm install
    ```

6. **Run the Frontend Application:**
    ```bash
    npm start
    ```

### Usage

- Use the POS system interface to add products to the cart, view the cart, and complete the checkout process.
- Log in to the admin panel to view all recorded transactions.

