# Hobbyist Haven

A platform for hobbyists to showcase their projects and collaborate with others.

## Features

- Rich text editing for project descriptions and documentation
- Secure authentication with Clerk
- Admin panel for user management
- Project collaboration system
- Responsive design

## Getting Started

1. Clone and install dependencies:
```bash
git clone https://github.com/your-username/hobbyist-haven.git
cd hobbyist-haven
npm install
```

2. Set up environment variables:
Create a `.env.local` file:
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
VITE_API_URL=http://localhost:3000/api
```

3. Start the development server:
```bash
npm run dev
```

## Navigation

- Home: Browse all projects
- Admin Panel: `/admin` (requires admin role)
- Project Details: Click any project card
- Create Project: Available to logged-in users

## Admin Access

Admin privileges can only be granted by directly updating the database:

```sql
UPDATE "User" SET role = 'ADMIN' WHERE email = 'admin@example.com';
```

## Authentication

1. Sign up or sign in using the Clerk UI
2. Admin users can access the admin panel
3. Regular users can create and edit their own projects

## Development

- Frontend: React + Vite + TypeScript
- Backend: Express + Prisma + PostgreSQL
- Authentication: Clerk
- UI Components: shadcn/ui

## Contributing

1. Fork the repository
2. Create a feature branch
3. Submit a pull request

## License

MIT