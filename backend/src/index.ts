import 'dotenv/config';
import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import compression from 'compression';
import rateLimit from 'express-rate-limit';

import { prisma } from './utils/prisma';
import authRoutes from './routes/auth';
import servicesRoutes from './routes/services';
import pipelinesRoutes from './routes/pipelines';
import deploymentsRoutes from './routes/deployments';
import environmentsRoutes from './routes/environments';
import credentialsRoutes from './routes/credentials';
import todosRoutes from './routes/todos';
import docsRoutes from './routes/docs';
import { errorHandler, notFound } from './middleware/errorHandler';

const app = express();

// Security headers
app.use(helmet());

// Compression
app.use(compression());

// CORS
const allowedOrigins = (process.env.ALLOWED_ORIGINS || 'http://localhost:3000,http://localhost:5173')
  .split(',')
  .map((o) => o.trim());

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (e.g. mobile apps, curl)
      if (!origin) return callback(null, true);
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      return callback(new Error(`CORS policy: origin ${origin} not allowed`));
    },
    credentials: true,
    methods: ['GET', 'POST', 'PATCH', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization'],
  })
);

// Body parser
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// General rate limiting
const generalLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { error: 'Too many requests, please try again later' },
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/api/', generalLimiter);

// Health check (no auth, no rate limit)
app.get('/health', async (_req, res) => {
  let dbStatus = 'disconnected';
  try {
    await prisma.$queryRaw`SELECT 1`;
    dbStatus = 'connected';
  } catch {
    dbStatus = 'disconnected';
  }
  res.json({
    status: 'ok',
    timestamp: new Date().toISOString(),
    database: dbStatus,
    version: process.env.npm_package_version || '1.0.0',
  });
});

// Seed / demo data endpoint (development only)
app.post('/api/seed', async (_req, res, next) => {
  if (process.env.NODE_ENV === 'production') {
    res.status(403).json({ error: 'Seeding is not allowed in production' });
    return;
  }
  try {
    // Environments
    const envProd = await prisma.environment.upsert({
      where: { name: 'production' },
      update: {},
      create: { name: 'production', description: 'Production environment' },
    });
    const envStaging = await prisma.environment.upsert({
      where: { name: 'staging' },
      update: {},
      create: { name: 'staging', description: 'Staging environment' },
    });
    const envDev = await prisma.environment.upsert({
      where: { name: 'development' },
      update: {},
      create: { name: 'development', description: 'Development environment' },
    });

    // Services
    const services = await Promise.all([
      prisma.service.upsert({
        where: { id: 'seed-service-1' },
        update: {},
        create: {
          id: 'seed-service-1',
          name: 'API Gateway',
          status: 'HEALTHY',
          version: 'v2.4.1',
          environment_id: envProd.id,
          last_deployment: new Date(Date.now() - 2 * 60 * 60 * 1000),
        },
      }),
      prisma.service.upsert({
        where: { id: 'seed-service-2' },
        update: {},
        create: {
          id: 'seed-service-2',
          name: 'Auth Service',
          status: 'HEALTHY',
          version: 'v1.8.3',
          environment_id: envProd.id,
          last_deployment: new Date(Date.now() - 5 * 60 * 60 * 1000),
        },
      }),
      prisma.service.upsert({
        where: { id: 'seed-service-3' },
        update: {},
        create: {
          id: 'seed-service-3',
          name: 'Payment Processor',
          status: 'WARNING',
          version: 'v3.1.0',
          environment_id: envProd.id,
          last_deployment: new Date(Date.now() - 24 * 60 * 60 * 1000),
        },
      }),
      prisma.service.upsert({
        where: { id: 'seed-service-4' },
        update: {},
        create: {
          id: 'seed-service-4',
          name: 'Notification Service',
          status: 'DOWN',
          version: 'v1.2.5',
          environment_id: envStaging.id,
        },
      }),
    ]);

    // Pipelines
    await Promise.all([
      prisma.pipeline.upsert({
        where: { id: 'seed-pipeline-1' },
        update: {},
        create: {
          id: 'seed-pipeline-1',
          name: 'CI/CD - API Gateway',
          status: 'SUCCESS',
          commit_hash: 'a1b2c3d',
          duration: 245,
          triggered_by: 'admin@example.com',
        },
      }),
      prisma.pipeline.upsert({
        where: { id: 'seed-pipeline-2' },
        update: {},
        create: {
          id: 'seed-pipeline-2',
          name: 'CI/CD - Auth Service',
          status: 'RUNNING',
          commit_hash: 'e4f5g6h',
          triggered_by: 'devops@example.com',
        },
      }),
      prisma.pipeline.upsert({
        where: { id: 'seed-pipeline-3' },
        update: {},
        create: {
          id: 'seed-pipeline-3',
          name: 'CI/CD - Payment Processor',
          status: 'FAILED',
          commit_hash: 'i7j8k9l',
          duration: 120,
          triggered_by: 'admin@example.com',
        },
      }),
    ]);

    // Deployments
    await Promise.all([
      prisma.deployment.upsert({
        where: { id: 'seed-deploy-1' },
        update: {},
        create: {
          id: 'seed-deploy-1',
          service_id: services[0].id,
          environment: 'production',
          commit_hash: 'a1b2c3d',
          status: 'SUCCESS',
          version: 'v2.4.1',
        },
      }),
      prisma.deployment.upsert({
        where: { id: 'seed-deploy-2' },
        update: {},
        create: {
          id: 'seed-deploy-2',
          service_id: services[2].id,
          environment: 'staging',
          commit_hash: 'i7j8k9l',
          status: 'FAILED',
          version: 'v3.1.0',
        },
      }),
    ]);

    // Todos
    await Promise.all([
      prisma.todo.upsert({
        where: { id: 'seed-todo-1' },
        update: {},
        create: {
          id: 'seed-todo-1',
          title: 'Fix payment processor alert',
          description: 'Investigate and resolve WARNING status on Payment Processor service',
          priority: 'HIGH',
          status: 'IN_PROGRESS',
        },
      }),
      prisma.todo.upsert({
        where: { id: 'seed-todo-2' },
        update: {},
        create: {
          id: 'seed-todo-2',
          title: 'Update SSL certificates',
          description: 'SSL certificates expire in 30 days',
          priority: 'CRITICAL',
          status: 'PENDING',
        },
      }),
      prisma.todo.upsert({
        where: { id: 'seed-todo-3' },
        update: {},
        create: {
          id: 'seed-todo-3',
          title: 'Set up monitoring dashboards',
          priority: 'MEDIUM',
          status: 'PENDING',
        },
      }),
    ]);

    // Documentation
    await Promise.all([
      prisma.documentation.upsert({
        where: { id: 'seed-doc-1' },
        update: {},
        create: {
          id: 'seed-doc-1',
          title: 'Deployment Process',
          content: '# Deployment Process\n\nThis document outlines the standard deployment process for all services.\n\n## Steps\n1. Create a pull request\n2. Pass CI checks\n3. Get code review approval\n4. Merge to main\n5. CI/CD pipeline triggers automatic deployment to staging\n6. Manual approval for production deployment',
          category: 'Operations',
        },
      }),
      prisma.documentation.upsert({
        where: { id: 'seed-doc-2' },
        update: {},
        create: {
          id: 'seed-doc-2',
          title: 'Incident Response Runbook',
          content: '# Incident Response Runbook\n\n## Severity Levels\n- **P1 (Critical)**: Complete service outage\n- **P2 (High)**: Partial service degradation\n- **P3 (Medium)**: Minor issues affecting subset of users\n\n## Response Steps\n1. Acknowledge the alert\n2. Create incident channel\n3. Identify root cause\n4. Apply fix or rollback\n5. Write post-mortem',
          category: 'Runbooks',
        },
      }),
    ]);

    res.json({ message: 'Seed data created successfully', environments: [envProd, envStaging, envDev] });
  } catch (err) {
    next(err);
  }
});

// API Routes
app.use('/api/auth', authRoutes);
app.use('/api/services', servicesRoutes);
app.use('/api/pipelines', pipelinesRoutes);
app.use('/api/deployments', deploymentsRoutes);
app.use('/api/environments', environmentsRoutes);
app.use('/api/credentials', credentialsRoutes);
app.use('/api/todos', todosRoutes);
app.use('/api/docs', docsRoutes);

// 404 handler
app.use(notFound);

// Global error handler
app.use(errorHandler);

// Graceful shutdown
async function shutdown() {
  console.log('Shutting down gracefully...');
  await prisma.$disconnect();
  process.exit(0);
}

process.on('SIGTERM', shutdown);
process.on('SIGINT', shutdown);

const PORT = parseInt(process.env.PORT || '3001', 10);

app.listen(PORT, () => {
  console.log(`🚀 DevOps Tracker API running on port ${PORT}`);
  console.log(`   Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`   Health: http://localhost:${PORT}/health`);

  // Attempt DB connection (non-blocking)
  prisma.$connect()
    .then(() => console.log('   Database: connected ✓'))
    .catch((err: Error) => console.warn(`   Database: not connected (${err.message})`));
});

export default app;
