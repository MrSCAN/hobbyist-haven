# Hobbyist Haven API Testing

This directory contains a Postman collection for testing the Hobbyist Haven API endpoints.

## Setup

1. Import the `hobbyist-haven.postman_collection.json` file into Postman
2. Create an environment in Postman with the following variables:
   - `baseUrl`: Your API base URL (e.g., `http://localhost:3000` for local development)
   - `authToken`: Your Clerk authentication token

## Available Endpoints

### Projects
- GET `/api/projects` - Get all projects
- GET `/api/projects/:id` - Get project by ID
- POST `/api/projects` - Create new project (requires authentication)
- PUT `/api/projects/:id` - Update project (requires authentication)
- DELETE `/api/projects/:id` - Delete project (requires authentication)

### Users
- GET `/api/users` - Get all users (requires admin)
- PUT `/api/users/:id/role` - Update user role (requires admin)

## Authentication

All authenticated endpoints require a valid Clerk token in the Authorization header:
```
Authorization: Bearer your_auth_token_here
```

## Testing

1. Set up your environment variables in Postman
2. Select the environment you created
3. Run the requests individually or use the Postman Collection Runner to run all tests