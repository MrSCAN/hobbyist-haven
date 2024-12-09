# Hobbyist Haven

A platform for hobbyists to showcase their projects and collaborate with others.

## Project Structure

This project is split into two repositories:

- Frontend (Current Repository): React application built with Vite, TypeScript, and shadcn/ui
- Backend: [hobbyist-haven-backend](https://github.com/your-org/hobbyist-haven-backend) - Express.js API with Prisma and PostgreSQL

## Frontend Setup

1. Clone this repository:
```bash
git clone https://github.com/your-org/hobbyist-haven
cd hobbyist-haven
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env.local` file in the root directory with the following variables:
```env
VITE_API_URL=http://localhost:3000/api
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key_here
```

4. Start the development server:
```bash
npm run dev
```

The frontend will be available at `http://localhost:8080`

## Backend Setup

1. Clone the backend repository:
```bash
git clone https://github.com/your-org/hobbyist-haven-backend
cd hobbyist-haven-backend
```

2. Install dependencies:
```bash
npm install
```

3. Create a `.env` file in the root directory with the following variables:
```env
DATABASE_URL="postgresql://user:password@localhost:5432/hobbyist_haven"
CLERK_SECRET_KEY=your_clerk_secret_key_here
CORS_ORIGIN=http://localhost:8080
```

4. Set up the database:
```bash
npx prisma migrate dev
```

5. Start the development server:
```bash
npm run dev
```

The API will be available at `http://localhost:3000`

## Development

When developing locally, make sure both the frontend and backend servers are running:

1. Start the backend server (port 3000)
2. Start the frontend development server (port 8080)
3. The frontend will automatically proxy API requests to the backend

## API Documentation

The API documentation is available at `http://localhost:3000/api-docs` when running the backend server.

## Environment Variables

### Frontend (.env.local)
- `VITE_API_URL`: Backend API URL (default: http://localhost:3000/api)
- `VITE_CLERK_PUBLISHABLE_KEY`: Clerk authentication publishable key

### Backend (.env)
- `DATABASE_URL`: PostgreSQL connection string
- `CLERK_SECRET_KEY`: Clerk authentication secret key
- `CORS_ORIGIN`: Frontend URL for CORS (default: http://localhost:8080)

## Deployment

### Frontend
1. Build the frontend:
```bash
npm run build
```

2. Deploy the `dist` directory to your hosting service

### Backend
1. Set up a PostgreSQL database
2. Deploy the backend to your hosting service
3. Set the required environment variables
4. Run database migrations:
```bash
npx prisma migrate deploy
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request