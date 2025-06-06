# Role Management System Assessment - TypeScript

## Overview
You are tasked with completing a role-based user management system built with TypeScript, Node.js, Express, and Drizzle ORM. The system has three user roles with specific permissions and capabilities.

## System Requirements

### User Roles & Permissions

#### Super Admin
- Can promote users to admin or super admin
- Can deactivate any user or admin
- Can demote admins to regular users
- Can view any user's profile
- Can reactivate deactivated users

#### Admin
- Can deactivate regular users (but cannot reactivate them)
- Can view any user's profile
- Cannot modify other admins or super admins

#### User
- Can only view their own profile
- Cannot perform administrative actions

### What's Already Implemented

1. **Database Schema** - Users table with role and status fields
2. **Basic API Structure** - Express server setup with middleware
3. **Authentication Middleware** - JWT-based authentication
4. **User Model** - Drizzle ORM setup with basic queries
5. **Basic Routes Structure** - Placeholder routes for all endpoints
6. **TypeScript Configuration** - Complete setup with proper types

### What You Need to Complete

#### 1. API Endpoints Implementation
Complete the following endpoints with proper authorization:

- `PUT /api/users/:id/role` - Change user role (super admin only)
- `PUT /api/users/:id/status` - Activate/deactivate users
- `GET /api/users/:id` - Get user profile (with role-based access)
- `GET /api/users` - List users (admin/super admin only)

#### 2. Authorization Logic
Implement role-based access control:
- Validate user permissions for each action
- Ensure users can only perform allowed operations
- Handle edge cases (e.g., can't deactivate yourself)

#### 3. Business Rules Implementation
- Super admin can promote users to admin/super admin
- Super admin can demote admins to users
- Super admin can activate/deactivate anyone
- Admin can only deactivate regular users
- Users can only access their own profile

## Technical Stack
- **Backend**: Node.js with Express & TypeScript
- **Database**: PostgreSQL with Drizzle ORM
- **Authentication**: JWT tokens
- **Testing**: Jest with TypeScript support
- **Validation**: Zod for schema validation

## Project Structure
```
src/
├── controllers/     # API endpoint handlers (TO COMPLETE)
├── middleware/      # Auth middleware (PROVIDED)
├── models/         # Database models & types (PROVIDED)
├── routes/         # Route definitions (TO COMPLETE)
├── services/       # Business logic (TO COMPLETE)
├── types/          # TypeScript type definitions (PROVIDED)
├── utils/          # Helper functions (PROVIDED)
└── tests/          # Test files (PROVIDED)
```

## Getting Started

1. Install dependencies: `npm install`
2. Set up environment variables in `.env`
3. Run database migrations: `npm run migrate`
4. Seed initial data: `npm run seed`
5. Start development server: `npm run dev`
6. Run tests: `npm test`

## Test Data
The system will be seeded with:
- 1 Super Admin (email: superadmin@test.com, password: password123)
- 2 Admins (admin1@test.com, admin2@test.com)
- 5 Regular Users (user1@test.com - user5@test.com)

## Expected Deliverables

1. Complete implementation of all API endpoints
2. Proper error handling and validation
3. Role-based authorization throughout
4. All tests passing (both public and hidden)
5. Clean, readable TypeScript code with proper types

## Evaluation Criteria

- **Functionality** (40%): All endpoints work as specified
- **Security** (25%): Proper authorization and validation
- **Code Quality** (20%): Clean, maintainable TypeScript code
- **Error Handling** (15%): Appropriate error responses

## Submission Instructions

1. Complete all TODO comments in the codebase
2. Ensure all public tests pass
3. Test your implementation thoroughly
4. Submit a pull request with your changes
5. Include a brief description of your implementation approach

## API Endpoints Reference

### Authentication
- `POST /api/auth/login` - User login (PROVIDED)

### User Management
- `PUT /api/users/:id/role` - Update user role
  - Body: `{ "role": "user" | "admin" | "super_admin" }`
  - Authorization: Super admin only

- `PUT /api/users/:id/status` - Update user status  
  - Body: `{ "status": "active" | "inactive" }`
  - Authorization: Admin/Super admin (with restrictions)

- `GET /api/users/:id` - Get user profile
  - Authorization: Own profile or admin/super admin

- `GET /api/users` - List all users
  - Authorization: Admin/Super admin only

## TypeScript Notes
- All types are provided in `src/types/`
- Use strict type checking
- Implement proper error handling with custom error types
- Follow TypeScript best practices