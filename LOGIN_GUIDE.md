# How to Login to the Cattle Market Application

This guide provides step-by-step instructions on how to login to the Cattle Market Application.

## Prerequisites

Before you begin, make sure you have:

1. Started the mock API server by running `npm run api` in a terminal
2. Started the Angular application by running `npm start` in another terminal
3. Opened your browser and navigated to `http://localhost:4200/`

## Login Steps

1. When you first access the application, you will be automatically redirected to the login page.

   ![Login Page](https://i.imgur.com/example1.png)

2. Enter your credentials:
   - Username: `admin`
   - Password: `1234`

3. Click the "Login" button.

4. If your credentials are correct, you will be redirected to the Cattle List page.

   ![Cattle List Page](https://i.imgur.com/example2.png)

5. If you enter incorrect credentials, an error message will be displayed. Try again with the correct credentials.

## Troubleshooting

If you encounter any issues while trying to login:

1. Make sure the mock API server is running (`npm run api`)
2. Make sure the Angular application is running (`npm start`)
3. Check that you're using the correct credentials (username: `admin`, password: `1234`)
4. Clear your browser cache and try again
5. Check the browser console for any error messages

## Logging Out

To log out of the application:

1. Click the "Logout" button in the top-right corner of the page.
2. You will be redirected back to the login page.
