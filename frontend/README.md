# Fitness AI Coach - Frontend (Angular)

This is the Angular frontend for the Fitness AI Coach application.

## Features

- User Authentication (Register/Login)
- AI Chat Interface
- Workout Management
- User Profile & Progress Tracking
- Dashboard with Statistics

## Tech Stack

- Angular 19.2.3
- TypeScript
- RxJS
- Angular Router
- HttpClient

## Installation

```bash
npm install
```

## Development

```bash
ng serve
```

Navigate to `http://localhost:4200/`

## Build

```bash
ng build
```

## API Configuration

Update `src/environments/environment.ts` with your backend API URL:

```typescript
export const environment = {
  production: false,
  apiUrl: 'http://localhost:5000/api'
};
```

## Components

- **Auth**: Login and Register pages
- **Dashboard**: Main overview with statistics
- **Chat**: AI fitness coach interface
- **Workouts**: Workout management
- **Profile**: User profile and settings

## Services

- **AuthService**: User authentication and token management
- **ChatService**: AI chat interactions
- **WorkoutService**: Workout CRUD operations
- **ProfileService**: User profile management
