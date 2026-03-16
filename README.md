# DevOps Project Tracker

A modern full-stack web application for DevOps engineers to monitor pipelines, deployments, and infrastructure — all from one unified control panel.

---

## 📸 Overview

The application features:
- **Hero Page** — 3D CI/CD pipeline animation with Framer Motion text effects
- **Dashboard** — Real-time metrics, deployment frequency charts, pipeline success rates
- **Services** — Monitor and manage your microservices with health indicators
- **Pipelines** — Track CI/CD pipeline runs, view logs, restart pipelines
- **Deployments** — Full deployment history with environment and status filters
- **Environments** — Manage development / staging / production environments
- **Credentials** — AES-256 encrypted credential storage for API keys, SSH keys, cloud tokens
- **Todos** — Priority-labeled task manager for DevOps engineers
- **Documentation** — Markdown editor/preview hub for Kubernetes, Docker, AWS guides
- **About** — Developer profile with animated skill bars

---

## 🗂️ Project Structure

```
DevOps-Project-Tracker/
├── frontend/          # Next.js 14 + TypeScript + TailwindCSS + Three.js
└── backend/           # Node.js + Express + TypeScript + Prisma ORM
```

---

## 🚀 Getting Started

### Prerequisites
- Node.js 18+
- PostgreSQL database (NeonDB recommended)

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
# Runs on http://localhost:3000
```

### Backend Setup

```bash
cd backend
npm install
cp .env.example .env
# Edit .env with your DATABASE_URL, JWT_SECRET, ENCRYPTION_KEY
npx prisma generate
npx prisma migrate dev --name init
npm run dev
# Runs on http://localhost:3001
```

---

## 🛠️ Tech Stack

### Frontend
| Technology | Purpose |
|---|---|
| Next.js 14 | React framework with App Router |
| TypeScript | Type safety |
| TailwindCSS | Utility-first styling |
| Three.js | 3D CI/CD pipeline animation |
| Framer Motion | Smooth UI animations |
| Recharts | Deployment & pipeline charts |
| Lucide React | Icon library |
| React Markdown | Documentation markdown preview |

### Backend
| Technology | Purpose |
|---|---|
| Node.js + Express | API server |
| TypeScript | Type safety |
| Prisma ORM | Database access layer |
| PostgreSQL (NeonDB) | Primary database |
| JWT | Authentication (access + refresh tokens) |
| bcryptjs | Password hashing (bcrypt, 12 rounds) |
| AES-256-CBC | Credential encryption |
| Helmet | Security headers |
| express-rate-limit | Rate limiting |
| express-validator | Input validation |

---

## 📡 API Reference

### Authentication
| Method | Endpoint | Description |
|---|---|---|
| POST | `/api/auth/register` | Register new user |
| POST | `/api/auth/login` | Login and receive JWT |
| POST | `/api/auth/refresh` | Refresh access token |
| GET | `/api/auth/profile` | Get current user profile |

### Services
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/services` | List all services |
| POST | `/api/services` | Create a service |
| PATCH | `/api/services/:id` | Update a service |
| DELETE | `/api/services/:id` | Delete a service |

### Pipelines
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/pipelines` | List all pipelines |
| POST | `/api/pipelines` | Create a pipeline |
| GET | `/api/pipelines/:id` | Get pipeline details |

### Deployments
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/deployments` | List all deployments |
| POST | `/api/deployments` | Create a deployment |
| GET | `/api/deployments/:id` | Get deployment details |

### Environments
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/environments` | List environments |
| POST | `/api/environments` | Create environment |
| PATCH | `/api/environments/:id` | Update environment |

### Credentials
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/credentials` | List credentials (masked) |
| POST | `/api/credentials` | Create credential (encrypted) |
| DELETE | `/api/credentials/:id` | Delete credential |

### Todos
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/todos` | List all todos |
| POST | `/api/todos` | Create todo |
| PATCH | `/api/todos/:id` | Update todo |
| DELETE | `/api/todos/:id` | Delete todo |

### Documentation
| Method | Endpoint | Description |
|---|---|---|
| GET | `/api/docs` | List all docs |
| POST | `/api/docs` | Create doc |
| PATCH | `/api/docs/:id` | Update doc |
| DELETE | `/api/docs/:id` | Delete doc |

---

## 🗃️ Database Schema

| Table | Key Fields |
|---|---|
| `users` | id, name, email, password_hash, role (ADMIN/DEVOPS_ENGINEER/VIEWER) |
| `services` | id, name, status (HEALTHY/WARNING/DOWN), version, environment_id |
| `pipelines` | id, name, status, commit_hash, duration, triggered_by |
| `deployments` | id, service_id, environment, commit_hash, status, version |
| `environments` | id, name, description |
| `credentials` | id, name, type, encrypted_value |
| `todos` | id, title, priority (LOW/MEDIUM/HIGH/CRITICAL), status |
| `documentation` | id, title, content (Markdown), category |

---

## 🔐 Security Features

- **JWT Authentication** — Access tokens (15 min) + Refresh tokens (7 days)
- **Role-Based Access** — Admin, DevOps Engineer, Viewer roles
- **Password Hashing** — bcrypt with 12 salt rounds
- **Credential Encryption** — AES-256-CBC with PBKDF2 key derivation
- **Rate Limiting** — 100 req/15min general; 5 attempts/15min on auth endpoints
- **CORS Protection** — Configurable allowed origins
- **Security Headers** — Helmet.js for HTTP security headers
- **Input Validation** — express-validator on all POST/PATCH routes

---

## 🌍 Environment Variables

### Backend (`.env`)

```env
DATABASE_URL="postgresql://user:password@host/dbname?sslmode=require"
JWT_SECRET="your-super-secret-jwt-key-min-32-chars"
JWT_REFRESH_SECRET="your-refresh-secret-key-min-32-chars"
ENCRYPTION_KEY="your-32-char-encryption-key-here!!"
PORT=3001
NODE_ENV=development
ALLOWED_ORIGINS="http://localhost:3000"
```

---

## 📄 License

MIT