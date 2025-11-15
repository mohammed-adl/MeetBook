# 📅 MeetBook – Availability and Booking Portal

![Next.js](https://img.shields.io/badge/-Next.js-000000?style=flat-square&logo=next.js)
![Express](https://img.shields.io/badge/-Express-000000?style=flat-square&logo=express)
![TypeScript](https://img.shields.io/badge/-TypeScript-3178C6?style=flat-square&logo=typescript&logoColor=white)
![PostgreSQL](https://img.shields.io/badge/-PostgreSQL-336791?style=flat-square&logo=postgresql&logoColor=white)
![Prisma](https://img.shields.io/badge/-Prisma-2D3748?style=flat-square&logo=prisma&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/-Tailwind-38B2AC?style=flat-square&logo=tailwind-css&logoColor=white)
![Zustand](https://img.shields.io/badge/-Zustand-000000?style=flat-square&logo=react&logoColor=white)

> 🚀 **MeetBook** is a full-stack two-sided marketplace for scheduling and booking video meeting slots.  
> Providers publish their availability with custom hourly rates, and Clients can browse and book slots with dynamic cost calculations.

---

## 🧩 Overview

**MeetBook** is a minimal yet complete booking platform that demonstrates modern full-stack development practices. It handles user authentication, role-based access control, dynamic pricing calculations, and transaction persistence — all with a clean, responsive interface.

**Core Highlights**

- 📅 Two-sided marketplace (Providers & Clients)
- 💰 Dynamic cost calculation based on hourly rates and slot duration
- 🔐 JWT-based authentication with refresh token mechanism
- ⚡ Real-time slot availability with auto-refresh
- 📊 Provider dashboard with booking statistics
- 🎯 Role-based routing and access control
- 🕐 UTC time handling throughout the system

---

## Table of Contents

1. [Features](#features)
2. [Tech Stack](#tech-stack)
3. [Architecture & Project Structure](#architecture--project-structure)
4. [Getting Started](#getting-started)
5. [API Endpoints](#api-endpoints)
6. [Design Decisions](#design-decisions)

---

## Features

### 👥 User & Role Management

- User registration and authentication with JWT tokens
- Two distinct user roles:
  - **Provider**: Users who publish available time slots
  - **Client**: Users who browse and book available slots
- Hourly rate defined per user for accurate cost calculation
- Secure password hashing and token-based sessions

### 📅 Slot Management (Provider)

- Providers can create time slots with start/end times
- Automatic duration calculation in minutes
- Overlap validation prevents double-booking
- Slots displayed with calculated earnings potential
- Real-time statistics dashboard showing:
  - Total slots created
  - Available slots
  - Booked slots
  - Total earnings

### 💸 Booking & Cost Calculation (Client)

- Browse all available slots from all providers
- Dynamic cost calculation: `(hourlyRate × duration) / 60`
- Real-time cost preview before booking confirmation
- Clean booking modal with detailed cost breakdown
- Automatic slot status update upon booking

### 🔐 Authentication & Security

- JWT access tokens with refresh token rotation
- Automatic token refresh on 401 errors
- Role-based route protection
- Secure credential storage with bcrypt
- CORS-enabled API with credential support

### 🎨 User Interface

- Clean, modern design with Tailwind CSS
- Responsive layout for all screen sizes
- Role-specific dashboards
- Loading states and error handling
- Smooth transitions and hover effects

---

## Tech Stack

### Frontend

- **Next.js ** - React framework with App Router
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Zustand** - Lightweight state management
- **React Query** - Server state management and caching

### Backend

- **Express.js** - Minimal and flexible Node.js framework
- **TypeScript** - Type-safe API development
- **Prisma ORM** - Type-safe database client
- **PostgreSQL** - Relational database
- **JWT** - Secure authentication tokens
- **bcrypt** - Password hashing

---

## Architecture & Project Structure

```text
meetbook/
├─ frontend/
│  ├─ public/
│  ├─ src/
│  │  ├─ app/              # Next.js App Router pages
│  │  ├─ components/       # React components
│  │  ├─ fetchers/         # API client functions
│  │  ├─ services/         # Business logic (auth, etc.)
│  │  ├─ stores/           # Zustand state stores
│  │  └─ utils/            # Helper functions
│  │  └─ types/            # TypeScript types
│  ├─ .env.example
|  ├─ .env
│  └─ package.json
├─ backend/
│  ├─ prisma/
│  │  ├─ schema.prisma     # Database schema
│  ├─ src/
│  │  ├─ controllers/      # Route handlers
│  │  ├─ middleware/       # Auth, validation, etc.
│  │  ├─ routes/           # API routes
│  │  ├─ lib/              # Utilities and helpers
|  |  |  config/            # Env, keys, and setup
│  │  ├─ services/         # Business logic (auth, etc.)
│  │  └─ utils/            # Helper functions
│  ├─ .env.example
|  ├─ .env
│  ├─ app.js               # Express app setup
│  └─ server.js            # Server entry point
└─ README.md
```

---

## Getting Started

### Prerequisites

- **Node.js** (v18 or higher)
- **PostgreSQL** (v14 or higher)
- **npm** or **yarn**

### Clone the repository

```bash
git clone <repository-url>
cd meetbook
```

### Install dependencies

```bash
# Backend
cd backend
npm install

# Frontend
cd ../frontend
npm install
```

### Configure environment variables

**Backend `.env`**

```bash
# App
NODE_ENV=development
BASE_URL=http://localhost:3000
PORT=3001

# Origin
ORIGIN=http://localhost:3000

# Database
DATABASE_URL=postgres://[username]:[password]@localhost:[port]/[database]

# Secrets
ACCESS_SECRET=[your_access_secret]
REFRESH_SECRET=[your_refresh_secret]
```

**Frontend `.env`**

```bash
# App
NEXT_PUBLIC_BASE_URL=http://localhost:3000

# API
NEXT_PUBLIC_API_BASE_URL=http://localhost:3001
NEXT_PUBLIC_API_ENDPOINT=http://localhost:3001/api/v1
```

### Database Setup

```bash
cd backend

# Generate Prisma Client
npx prisma generate

# Run migrations
npx prisma migrate dev

# (Optional) Seed database
npx prisma db seed
```

### Run the application

```bash
# Start backend (from backend directory)
npm run dev

# Start frontend (from frontend directory)
npm run dev
```

- **Frontend**: [http://localhost:3000](http://localhost:3000)
- **Backend**: [http://localhost:3001](http://localhost:3001)

---

## Design Decisions

### Why Express over NestJS?

While NestJS provides excellent structure and built-in features, **Express was chosen for this project** because:

1. **Simplicity**: The application requirements are straightforward and don't require NestJS's heavyweight architecture
2. **Flexibility**: Express provides more freedom in structuring the codebase
3. **Learning Curve**: Faster development with less boilerplate
4. **Performance**: Minimal overhead for a small-scale application
5. **Familiarity**: Widely adopted and easier to debug

### Database Schema Design

The schema uses three main models:

- **User**: Stores authentication and profile data with role-based access
- **Slot**: Represents time availability with duration and status
- **Booking**: Links clients, providers, and slots with transaction details

Key design choices:

- All times stored in UTC for consistency
- Duration stored in minutes for precise calculations
- Slot status enum for clear availability tracking
- Indexes on frequently queried fields (role, hourlyRate, status)

### State Management Strategy

- **Zustand**: Used for client-side state (authentication, user data)
- **React Query**: Used for server state (slots, bookings) with automatic caching and refetching

This separation provides optimal performance and developer experience.

### Cost Calculation

The cost is calculated dynamically on the frontend based on the provider's hourly rate and slot duration. This approach keeps the database normalized and allows hourly rate updates without recalculating stored costs.

### UTC Time Handling

All datetime values are stored in UTC in the database and transmitted as ISO 8601 strings for consistency across timezones.

---
