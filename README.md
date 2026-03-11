# Kaizen Box

> **Continuous improvement, one task at a time.**

A full-stack task and project management platform inspired by the Japanese Kaizen philosophy — the practice of making small, continuous improvements every day. Built with React 19, FastAPI, and AWS Cognito.

![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=black)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![FastAPI](https://img.shields.io/badge/FastAPI-0.128-009688?logo=fastapi&logoColor=white)
![Python](https://img.shields.io/badge/Python-3.13-3776AB?logo=python&logoColor=white)
![Terraform](https://img.shields.io/badge/Terraform-AWS-7B42BC?logo=terraform&logoColor=white)
![License](https://img.shields.io/badge/license-MIT-green)

---

## Overview

Kaizen Box helps teams plan, track, and organize their work efficiently. It provides Kanban boards, list views, task assignment, and progress tracking — all secured with AWS Cognito authentication (including Google and LinkedIn OAuth).

**Key features:**
- Task creation with unique IDs, assignment, and status tracking
- Kanban board and list views
- AWS Cognito authentication with SRP and OAuth (Google, LinkedIn)
- Dark / light theme with localStorage persistence
- Internationalization: English, Polish, German
- Responsive design across desktop and mobile

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, TypeScript 5.9, Vite 7, Tailwind CSS 4 |
| **State / Forms** | React Hook Form, Zod, React Router DOM 7 |
| **Auth** | AWS Amplify 6, Amazon Cognito |
| **Charts** | Recharts |
| **Icons** | Phosphor Icons |
| **Backend** | FastAPI 0.128, Python 3.13, Uvicorn |
| **Infrastructure** | Docker, Nginx (Alpine), Docker Compose |
| **IaC** | Terraform ≥ 1.0, AWS Provider ~5.0 |
| **Testing** | Vitest 4, Playwright 1.58, Testing Library |
| **Code quality** | ESLint 9, Prettier 3, Husky 9, lint-staged |
| **i18n** | i18next 25, react-i18next, browser language detector |

---

## Project Structure

```
kaizen-box/
├── frontend/                  # React + Vite application
│   ├── src/
│   │   ├── components/        # Reusable UI components
│   │   │   ├── features/      # Feature-specific components
│   │   │   ├── layout/        # Layout components (sidebar, header)
│   │   │   └── ui/            # Base UI primitives
│   │   ├── context/           # React context providers (Auth, Theme)
│   │   ├── hooks/             # Custom React hooks
│   │   ├── i18n/              # Internationalization setup
│   │   │   └── locales/       # Translation files (en, pl, de)
│   │   ├── pages/             # Route-level page components
│   │   ├── router.tsx         # App routing configuration
│   │   ├── schemas/           # Zod validation schemas
│   │   ├── services/          # API service layer
│   │   ├── store/             # Client-side state
│   │   ├── types/             # TypeScript type definitions
│   │   └── utils/             # Utility helpers
│   ├── e2e/                   # Playwright end-to-end tests
│   ├── Dockerfile.dev         # Frontend development container
│   └── package.json
├── backend/                   # FastAPI application
│   ├── api/                   # API route handlers
│   ├── core/                  # App configuration and settings
│   ├── middleware/            # Custom middleware
│   ├── models/                # Database models
│   ├── repositories/          # Data access layer
│   ├── schemas/               # Pydantic request/response schemas
│   ├── services/              # Business logic
│   ├── tests/                 # Backend unit and integration tests
│   ├── utils/                 # Utility helpers
│   ├── main.py                # FastAPI entrypoint
│   └── requirements.txt
├── terraform/                 # Infrastructure as code
│   ├── modules/cognito/       # AWS Cognito module
│   ├── envs/                  # Environment-specific configs (dev, prod)
│   ├── main.tf
│   ├── provider.tf
│   ├── variable.tf
│   └── outputs.tf
├── nginx/                     # Nginx configuration
├── nginx.conf                 # Nginx reverse proxy config
├── docker-compose.yml         # Full-stack Docker Compose setup
├── makefile                   # Developer shortcuts
├── monitoring/                # Monitoring configuration
└── ansible/                   # Ansible playbooks
```

---

## Getting Started

### Prerequisites

- [Docker](https://docs.docker.com/get-docker/) and Docker Compose
- [Node.js ≥ 20](https://nodejs.org/) and [pnpm](https://pnpm.io/installation)
- [Python 3.13](https://www.python.org/downloads/)
- AWS account with Cognito User Pool (see [Infrastructure](#infrastructure-terraform))

### Clone the repository

```bash
git clone https://github.com/your-org/kaizen-box.git
cd kaizen-box
```

### Environment variables

Create `frontend/.env` from the example:

```bash
cp frontend/.env.example frontend/.env
```

Set the following variables:

```env
VITE_USER_POOL_ID=us-east-1_XXXXXXXXX
VITE_USER_POOL_CLIENT_ID=XXXXXXXXXXXXXXXXXXXXXXXXXX
```

You can find these values in the AWS Cognito console or from Terraform outputs after provisioning.

### Run with Docker Compose (recommended)

```bash
docker compose up
```

The application will be available at **http://localhost:8080**.

Services started:
- `kzn-gateway` — Nginx reverse proxy on port 8080
- `kzn-frontend-dev` — Vite dev server with hot reload

### Run locally

**Frontend:**

```bash
cd frontend
pnpm install
pnpm run dev
```

Runs at **http://localhost:5173**.

**Backend:**

```bash
cd backend
python -m venv venv
source venv/bin/activate       # Windows: venv\Scripts\activate
pip install -r requirements.txt
uvicorn main:app --reload
```

Runs at **http://localhost:8000**.

---

## Frontend Scripts

All scripts are run from the `frontend/` directory using `pnpm`:

| Command | Description |
|---|---|
| `pnpm run dev` | Start Vite dev server with HMR |
| `pnpm run build` | Type-check and build for production |
| `pnpm run preview` | Preview the production build locally |
| `pnpm run lint` | Run ESLint on all source files |
| `pnpm run format` | Format all files with Prettier |
| `pnpm run format:check` | Check formatting without writing |
| `pnpm run test` | Run Vitest in watch mode |
| `pnpm run test:run` | Run Vitest once (CI mode) |
| `pnpm run test:e2e` | Run Playwright E2E tests |
| `pnpm run test:e2e:ui` | Run Playwright with interactive UI |

---

## Infrastructure (Terraform)

AWS Cognito is provisioned with Terraform. The configuration lives in `terraform/` and supports `dev` and `prod` environments.

### Provision Cognito

```bash
cd terraform

# Initialize providers
terraform init

# Target a specific environment
terraform workspace select dev   # or: prod

# Preview changes
terraform plan -var-file=envs/dev/terraform.tfvars

# Apply
terraform apply -var-file=envs/dev/terraform.tfvars
```

After `apply`, retrieve the Cognito IDs:

```bash
terraform output
```

Copy the User Pool ID and Client ID into your `frontend/.env`.

### Terraform module: `modules/cognito`

Manages the full Cognito User Pool, including:
- User Pool and App Client configuration
- OAuth 2.0 flows (Authorization Code, Implicit)
- Social identity providers (Google, LinkedIn)
- Custom attributes and password policies

---

## Authentication

Kaizen Box uses **AWS Amplify** with **Amazon Cognito** for authentication.

### Flow

1. User navigates to the login page
2. AWS Amplify initiates the SRP (Secure Remote Password) authentication flow
3. On success, Cognito issues JWT tokens (ID, Access, Refresh)
4. The `AuthContext` stores the session and exposes `user`, `signIn`, `signOut` to the app
5. Protected routes check auth state via React Router

### OAuth (Social login)

Social login is supported for:
- **Google**
- **LinkedIn**

These are configured as identity providers in the Cognito User Pool. Users are redirected through the Cognito hosted UI and back to the application on completion.

### Multi-step login

The login page implements a multi-step flow: email entry → password entry, providing a modern UX similar to Google/Microsoft sign-in.

---

## Testing

### Unit tests (Vitest)

```bash
cd frontend
pnpm run test:run
```

Tests are co-located with source files (`*.test.tsx`) or in `src/test/`. They use **Testing Library** for component-level assertions and **jsdom** as the browser environment.

### E2E tests (Playwright)

```bash
cd frontend
pnpm run test:e2e
```

E2E test suites in `frontend/e2e/`:

| File | Coverage |
|---|---|
| `login.spec.ts` | Login form interaction, auth flows |
| `login-responsive.spec.ts` | Login page on mobile viewports |
| `dashboard.spec.ts` | Dashboard content and navigation |
| `dashboard-responsive.spec.ts` | Dashboard on mobile viewports |

---

## Internationalization

The app supports three languages, auto-detected from the browser:

| Code | Language |
|---|---|
| `en` | English (default) |
| `pl` | Polish |
| `de` | German |

Translation files live in `frontend/src/i18n/locales/`. Language detection uses `i18next-browser-languagedetector` and falls back to English.

To add a new language:
1. Add a JSON file to `frontend/src/i18n/locales/<code>.json`
2. Register it in `frontend/src/i18n/index.ts`

---

## Contributing

### Branch naming

```
feature/<ticket-id>-short-description
fix/<ticket-id>-short-description
chore/<ticket-id>-short-description
```

### Pre-commit hooks

This project uses **Husky** + **lint-staged** to enforce code quality on every commit:

- `*.{ts,tsx}` — ESLint (auto-fix) + Prettier
- `*.{json,md,css,html,yml,yaml}` — Prettier

Hooks are installed automatically when you run `pnpm install` in the `frontend/` directory.

### Pull request process

1. Fork or create a branch from `main`
2. Make your changes and ensure all tests pass (`pnpm run test:run` + `pnpm run test:e2e`)
3. Open a PR with a clear description and link to the relevant ticket
4. Request a review — PRs require at least one approval before merging

---

## License

This project is licensed under the **MIT License**.
