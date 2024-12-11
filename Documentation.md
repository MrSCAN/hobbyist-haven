# Hobbyist Haven Documentation

## Codebase Structure

### Frontend (React + Vite)

#### Core Files
- `src/App.tsx`: Main application component with routing, Clerk authentication, and query client setup
- `src/index.css`: Global styles and Tailwind CSS configurations
- `src/main.tsx`: Application entry point

#### Pages (`src/pages/`)
- `Index.tsx`: Homepage with project grid and search
- `ProjectDetailsPage.tsx`: Project details with tabs (overview, documentation, stages)
- `AdminPage.tsx`: Admin dashboard for user management

#### Components (`src/components/`)
- `Header.tsx`: Navigation bar with search and branding
- `ProjectCard.tsx`: Project preview card with sharing
- `ProjectDetails.tsx`: Detailed project information modal
- `AdminDashboard.tsx`: User and role management interface
- `RichTextEditor.tsx`: TipTap-based text editor
- `ProjectForm.tsx`: Project creation/editing form
- `StageDetails.tsx`: Project stage display component

#### Utilities (`src/lib/`)
- `apiClient.ts`: Backend API communication
- `api.ts`: Development mock data
- `utils.ts`: Common utility functions
- `db.ts`: Database configuration

#### Hooks (`src/hooks/`)
- `use-toast.ts`: Toast notification hook

### Backend (Express + Prisma)

#### Core Files
- `backend/src/index.ts`: Server entry point
- `backend/prisma/schema.prisma`: Database schema

#### Routes (`backend/src/routes/`)
- `projects.ts`: Project CRUD operations
- `users.ts`: User operations and Clerk webhook

#### Middleware (`backend/src/middleware/`)
- `auth.ts`: Clerk authentication and admin verification

#### Configuration
- `backend/.env`: Environment variables
- `backend/swagger.ts`: API documentation

## Clerk Webhook Configuration

### 1. Create Webhook in Clerk Dashboard
1. Go to [Clerk Dashboard](https://dashboard.clerk.dev)
2. Select your application
3. Navigate to "Webhooks" in the sidebar
4. Click "Add Endpoint"
5. Configure the webhook:
   - URL: `https://your-api-domain.com/api/users/webhook`
   - Events: Select `user.created` and `user.updated`
   - Version: Select the latest stable version
   - Sign webhook requests: Enabled (recommended)

### 2. Backend Configuration
1. Add webhook secret to `.env`:
```env
CLERK_WEBHOOK_SECRET=your_webhook_secret
```

2. The webhook endpoint is already configured in `backend/src/routes/users.ts`:
```typescript
router.post('/webhook', express.raw({ type: 'application/json' }), async (req, res) => {
  try {
    const webhook = new Webhook(req.body);
    const { data, type } = webhook;

    if (type === 'user.created') {
      await prisma.user.create({
        data: {
          id: data.id,
          email: data.email_addresses[0].email_address,
          name: `${data.first_name} ${data.last_name}`.trim(),
          role: 'USER',
        },
      });
    }

    res.json({ success: true });
  } catch (error) {
    console.error('Webhook error:', error);
    res.status(400).json({ error: 'Webhook error' });
  }
});
```

### 3. Testing Webhooks
1. Use Clerk's Dashboard to send test events
2. Monitor your server logs for webhook reception
3. Verify user creation in your database

## Environment Variables

### Frontend (.env.local)
```env
VITE_CLERK_PUBLISHABLE_KEY=your_clerk_key
VITE_API_URL=http://localhost:3000/api
```

### Backend (.env)
```env
DATABASE_URL=postgresql://user:password@localhost:5432/hobbyist_haven
CLERK_SECRET_KEY=your_clerk_secret_key
CLERK_WEBHOOK_SECRET=your_webhook_secret
CORS_ORIGIN=http://localhost:8080
PORT=3000
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
npm install

# Run database migrations
npx prisma migrate dev

# Start server
npm run dev
```

The application will be available at:
- Frontend: `http://localhost:8080`
- API: `http://localhost:3000`
- API Documentation: `http://localhost:3000/api-docs`

## Key Features
1. Clerk Authentication
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