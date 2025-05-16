# Cattle Market Application

This project is an Angular 19 application for managing a cattle market inventory. It allows users to view, add, and update the availability status of cattle.

## Features

- User authentication (login/logout)
- View list of cattle with details (ID, breed, weight, price, availability)
- Mark cattle as sold/available
- Add new cattle to the inventory
- Responsive design using Angular Material

## Technical Implementation

- Angular 19 with standalone components
- Angular Material for UI components
- Reactive Forms for form handling
- HTTP Interceptors for authentication
- Custom Pipes for data formatting
- Route Guards for protected routes

### Angular 19 Features

- **Server-Side Rendering (SSR)**
  - Server-side rendering For improving SEO and initial load performance.
  - `/cattle` page is pre-rendered on the server, providing a faster first contentful paint.

- **App Shell**
  - Implements an application shell for improved perceived performance and instant loading experience.
  - Uses Angular Material skeleton loaders to provide visual feedback while the app loads.

- **withFetch()**
  - Utilizes the new `withFetch()` API for route data fetching, enabling more efficient and declarative data loading strategies in route configurations.

- **Standalone Components**
  - Leverages Angular's standalone component architecture, reducing the need for NgModules and simplifying component structure and reuse.

- **Lazy Loaded Components**
  - Implements lazy loading for components and routes, improving initial load time and optimizing bundle size.

## Getting Started

### Installation

1. Clone the repository
2. Install dependencies:

```bash
npm install
```

### Running the Application

You need to run both the mock API server and the Angular application:

1. Start the mock API server:

```bash
npm run api
```

2. In a separate terminal, start the Angular application:

```bash
npm run start
```

3. Open your browser and navigate to `http://localhost:4200/`

### Login Credentials

Use the following credentials to log in:

- Username: admin
- Password: 1234

For detailed login instructions, please refer to the [LOGIN_GUIDE.md](LOGIN_GUIDE.md) file.

You can also test the login functionality without running the full application by opening the [login-test.html](login-test.html) file in your browser.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```
