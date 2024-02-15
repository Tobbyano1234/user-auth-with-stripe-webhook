# user-auth-with-stripe-webhook


# API Endpoints and Stripe Webhook Implementation

This repository contains an implementation of API endpoints to connect with MongoDB Atlas using Express, MongoDB, Mongoose, and TypeScript. Additionally, it includes an implementation of a Stripe webhook endpoint to handle payment events.

## Task 1: API Endpoints

### Register and Authenticate Users

- **Endpoint:** `api/v1/api/register`
  - **Method:** POST
  - **Description:** Register new users.
  - **Request Body:**
    ```json
    {
      "username": "example_user",
      "password": "secure_password"
    }
    ```
  - **Response:**
    ```json
    {
      "message": "User registered successfully"
    }
    ```

- **Endpoint:** `api/v1/api/login`
  - **Method:** POST
  - **Description:** Authenticate existing users and generate an access token.
  - **Request Body:**
    ```json
    {
      "username": "example_user",
      "password": "secure_password"
    }
    ```
  - **Response:**
    ```json
    {
      "token": "your_generated_access_token"
    }
    ```



## Task 2: Stripe Webhook Implementation

### Handle Stripe Payment Events

- **Endpoint:** `api/v1/webhook/stripe`
  - **Method:** POST
  - **Description:** Accept requests from the Stripe webhook, verify successful payment events, and update user status to "paid" in the database.
  - **Request Body:** Stripe webhook payload
  - **Response:**
    ```json
    {
      "received": true
    }
    ```

## Technologies Used

- **Express:** A fast, unopinionated, minimalist web framework for Node.js.
- **MongoDB:** A NoSQL database for storing user data.
- **Mongoose:** An ODM (Object Data Modeling) library for MongoDB and Node.js.
- **TypeScript:** A superset of JavaScript that adds static typing and other features.

## Getting Started

1. Clone the repository:

   ```bash
   git clone https://github.com/Tobbyano1234/user-auth-with-stripe-webhook
   ```

2. Install dependencies:

   ```bash
   cd your-repository
   yarn && yarn build
   ```

3. Set up MongoDB Atlas credentials and Stripe API keys in the configuration files.

4. Run the application:

   ```bash
   yarn start
   ```

5. The application will be running at `http://localhost:4500`.

## Additional Notes

- Ensure MongoDB Atlas connection details are correctly configured in the `vzy-web-api/config/database/index.ts` file.
