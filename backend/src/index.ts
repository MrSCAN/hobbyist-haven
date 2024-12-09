import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { projectsRouter } from './routes/projects';
import { usersRouter } from './routes/users';
import swaggerUi from 'swagger-ui-express';
import { swaggerSpec } from './swagger';

dotenv.config();

const app = express();
const port = process.env.PORT || 3000;

app.use(cors({
  origin: process.env.CORS_ORIGIN || 'http://localhost:8080',
  credentials: true,
}));

app.use(express.json());

// API Documentation
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// API Routes
app.use('/api/projects', projectsRouter);
app.use('/api/users', usersRouter);

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
  console.log(`API Documentation available at http://localhost:${port}/api-docs`);
});