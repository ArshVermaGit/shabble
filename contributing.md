# Contributing to Shabble

Thank you for your interest in contributing to **Shabble** — the daily shape guessing puzzle game! 🎉
We welcome contributions of all kinds, from bug fixes and performance improvements to new features and documentation updates.

---

## Table of Contents

- [Code of Conduct](#code-of-conduct)
- [Getting Started](#getting-started)
  - [Prerequisites](#prerequisites)
  - [Fork & Clone](#fork--clone)
  - [Environment Setup](#environment-setup)
  - [Install Dependencies](#install-dependencies)
  - [Database Setup](#database-setup)
  - [Running the Dev Server](#running-the-dev-server)
- [Project Structure](#project-structure)
- [Development Workflow](#development-workflow)
  - [Branching Strategy](#branching-strategy)
  - [Making Changes](#making-changes)
  - [Commit Message Guidelines](#commit-message-guidelines)
  - [Running Linting](#running-linting)
- [Submitting a Pull Request](#submitting-a-pull-request)
- [Reporting Issues](#reporting-issues)
- [Tech Stack](#tech-stack)

---

## Code of Conduct

By participating in this project, you agree to maintain a respectful and welcoming environment for everyone. Please be kind, constructive, and inclusive in all interactions.

---

## Getting Started

### Prerequisites

Make sure you have the following installed before you begin:

- **Node.js** v18 or later
- **pnpm** (preferred package manager — install via `npm install -g pnpm`)
- **PostgreSQL** (local instance or a cloud-hosted connection string)
- **Git**

### Fork & Clone

1. Click the **Fork** button at the top-right of the [Shabble repository](https://github.com/coder-zs-cse/shabble).
2. Clone your fork locally:

```bash
git clone https://github.com/<your-username>/shabble.git
cd shabble
```

3. Add the upstream remote so you can keep your fork in sync:

```bash
git remote add upstream https://github.com/coder-zs-cse/shabble.git
```

### Environment Setup

Copy the example environment file and fill in your values:

```bash
cp .env.example .env
```

Open `.env` and update the `POSTGRES_URL` variable with your PostgreSQL connection string:

```env
POSTGRES_URL="postgresql://USER:PASSWORD@HOST:PORT/DATABASE"
```

### Install Dependencies

```bash
pnpm install
```

### Database Setup

Run the Prisma migration to set up your local database schema:

```bash
npm run prisma:migrate
```

### Running the Dev Server

```bash
npm run dev
```

The app will be available at [http://localhost:3000](http://localhost:3000).

---

## Project Structure

```
shabble/
├── app/              # Next.js App Router pages and layouts
├── prisma/           # Prisma schema and migrations
├── public/           # Static assets
├── src/              # Core application source (components, utils, types, etc.)
├── middleware.ts     # Next.js middleware
├── next.config.ts    # Next.js configuration
├── tailwind.config.ts
└── tsconfig.json
```

---

## Development Workflow

### Branching Strategy

Always create a new branch for your work. Never commit directly to `main`.

```bash
# Sync with upstream first
git fetch upstream
git checkout main
git merge upstream/main

# Create your feature branch
git checkout -b feature/your-feature-name
# or for bug fixes:
git checkout -b fix/short-description
```

Use descriptive branch names such as:
- `feature/add-new-shape-type`
- `fix/score-calculation-bug`
- `docs/update-readme`
- `refactor/game-state-logic`

### Making Changes

- Follow the existing **TypeScript** and **Tailwind CSS** patterns in the codebase.
- Keep components modular and reusable.
- When modifying the database schema, always create a new Prisma migration:

```bash
npm run prisma:migrate
```

- Avoid committing secrets, `.env` files, or any credentials.

### Commit Message Guidelines

Follow the [Conventional Commits](https://www.conventionalcommits.org/) format:

```
<type>(<scope>): <short description>
```

**Types:**

| Type       | When to use                                      |
|------------|--------------------------------------------------|
| `feat`     | A new feature                                    |
| `fix`      | A bug fix                                        |
| `docs`     | Documentation changes only                       |
| `style`    | Formatting, missing semicolons, etc.             |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `test`     | Adding or updating tests                         |
| `chore`    | Tooling, dependencies, config changes            |

**Examples:**

```
feat(game): add hexagon shape to puzzle pool
fix(score): correct off-by-one in daily streak calculation
docs: add CONTRIBUTING.md
chore: upgrade prisma to v5.22
```

### Running Linting

Before opening a pull request, make sure your code passes the linter:

```bash
npm run lint
```

Fix any reported issues before submitting.

---

## Submitting a Pull Request

1. Push your branch to your fork:

```bash
git push origin feature/your-feature-name
```

2. Open a Pull Request against the `main` branch of `coder-zs-cse/shabble`.
3. Fill in the PR template with:
   - A clear **title** following the commit message format.
   - A **description** of what changed and why.
   - Screenshots or a short demo if the change is visual.
   - Reference any related issues (e.g., `Closes #12`).
4. Wait for a review. Be ready to make requested changes.
5. Once approved, your PR will be merged. 🎉

---

## Reporting Issues

Found a bug or have a feature idea? Please [open an issue](https://github.com/coder-zs-cse/shabble/issues) and include:

- A clear, descriptive title.
- Steps to reproduce the problem (for bugs).
- Expected vs. actual behavior.
- Screenshots if applicable.
- Your environment (OS, browser, Node.js version).

---

## Tech Stack

| Layer        | Technology                          |
|--------------|-------------------------------------|
| Framework    | Next.js 15 (App Router, Turbopack)  |
| Language     | TypeScript                          |
| Styling      | Tailwind CSS, tailwind-variants     |
| Database ORM | Prisma                              |
| Database     | PostgreSQL                          |
| Validation   | Zod                                 |
| HTTP Client  | Axios                               |
| Package Mgr  | pnpm                                |
| Deployment   | Vercel                              |

---

We appreciate every contribution, big or small. Happy hacking! 🚀
