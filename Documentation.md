# Hobbyist Haven Documentation

## Authentication

The application uses a custom authentication system with JWT tokens. Users can sign up and sign in through beautiful, responsive forms that provide a seamless experience.

### Environment Variables

Add these variables to your `.env` file:
```env
VITE_API_URL=http://localhost:3000/api
DATABASE_URL=your_postgres_connection_string
JWT_SECRET=your_jwt_secret_key
```

### API Endpoints

#### Authentication
- POST `/api/users/register` - Register a new user
- POST `/api/users/login` - Sign in a user
- GET `/api/users` - Get all users (requires admin)
- GET `/api/users/:id` - Get user role
- PUT `/api/users/:id/role` - Update user role (requires admin)

#### Projects
- GET `/api/projects` - Get all projects
- GET `/api/projects/:id` - Get project by ID
- POST `/api/projects` - Create new project (requires authentication)
- PUT `/api/projects/:id` - Update project (requires authentication)
- DELETE `/api/projects/:id` - Delete project (requires authentication)

Request body for register:
```json
{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "securepassword"
}
```

Request body for login:
```json
{
  "email": "john@example.com",
  "password": "securepassword"
}
```

## Running the Application

### Frontend
```bash
# Install dependencies
npm install

# Start development server
npm run dev
```

### Backend
```bash
# Navigate to backend directory
cd backend

# Install dependencies
pip install -r requirements.txt

# Run database migrations
prisma db push

# Start server
python app.py
```

The application will be available at:
- Frontend: `http://localhost:8080`
- API: `http://localhost:3000`
- API Documentation: `http://localhost:3000/api-docs`

## Key Features
1. Custom Authentication System with JWT
2. PostgreSQL + Prisma ORM
3. Rich Text Editing (TipTap)
4. Image Upload
5. Admin Panel
6. Project Collaboration
7. Responsive Design

## Database Schema
The application uses three main models:
- User: Authentication and role management
- Project: Main project information
- ProjectStage: Project development stages

See `backend/prisma/schema.prisma` for detailed schema definitions.

## Admin Access

Admin privileges can only be granted by directly updating the database:

```sql
UPDATE "User" SET role = 'ADMIN' WHERE email = 'admin@example.com';
```

## Navigation

- Home: Browse all projects
- Admin Panel: `/admin` (requires admin role)
- Project Details: Click any project card
- Create Project: Available to logged-in users

## Development

- Frontend: React + Vite + TypeScript
- Backend: Flask + Prisma + PostgreSQL
- UI Components: shadcn/ui

## Contributing

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## License

MIT