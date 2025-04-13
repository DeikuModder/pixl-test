# PixlHub - E-commerce Platform

A simple e-commerce platform with user authentication, product listings, and dashboard management.

## Features

- User authentication (login/signup)
- Product listing & management
- Admin dashboard for product CRUD operations
- Responsive design

## Tech Stack

- **Frontend**: Next.js 14 (App Router), React 19, TypeScript
- **Styling**: Tailwind CSS, ShadCN UI components
- **Database**: Supabase (PostgreSQL + Storage)
- **Authentication**: JWT cookies
- **State Management**: React Query
- **ORM**: Prisma

## Project Structure

```
src/
├── app/ # Next.js routes
├── components/ # Reusable components
├── hooks/ # Custom hooks
├── lib/ # Utility functions
└── types.tsx # TypeScript types
```

## Setup Instructions

### 1. Clone the repository
```bash
git clone https://github.com/DeikuModder/pixl-test
cd pixlhub
```

### 2. Install dependencies
```bash
npm install
```

### 3. Setup environments variables
```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your-supabase-url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your-anon-key
JWT_SECRET=your-jwt-secret

# Database
DATABASE_URL=your-postgres-url
DIRECT_URL=your-postgres-direct-url
```

### 4. Setup database
```bash
npx prisma migrate dev --name init
```

### 5. Run the development server
```bash
npm run dev
```

Open http://localhost:3000 to view the app.

Demo Accounts:
- Admin: admin@test.com / test123

- User: test@example.com / test123
