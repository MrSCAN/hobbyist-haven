# Hobbyist Haven Documentation

## Clerk Webhook Configuration

### 1. Create Webhook in Clerk Dashboard
1. Go to [Clerk Dashboard](https://dashboard.clerk.dev)
2. Select your application
3. Navigate to "Webhooks" in the sidebar
4. Click "Add Endpoint"
5. Configure the webhook:
   - URL: `http://localhost:3000/api/webhook`
   - Events: Select `user.created` and `user.updated`
   - Version: Select the latest stable version
   - Sign webhook requests: Enabled (recommended)
   - Get the webhook secret and add it to your `.env` file

### 2. Environment Variables
Add these variables to your `.env` file:
```env
CLERK_WEBHOOK_SECRET=your_webhook_secret
DATABASE_URL=your_postgres_connection_string
```

### 3. Backend Configuration
The webhook endpoint is already configured in `backend/src/routes/users.ts`:
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

### 4. Testing Webhooks
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
