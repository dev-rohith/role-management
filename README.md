# Role Management Assessment - TypeScript

### Note: Please read all the instructions before starting the assessment.

## Overview

You are tasked with completing a role-based user management system built with TypeScript, Node.js, Express, and Drizzle ORM. The system has three user roles with specific permissions and capabilities.

### Requirements

#### User Roles & Permissions

##### Super Admin

1. Can promote users to admin or demote admin to user
4. Can view any user's profile
2. Can deactivate any user or admin
5. Can reactivate deactivated users

#### Admin

1. Can deactivate regular users (but cannot reactivate them)
2. Can view any user's profile
3. Cannot modify other admins or super admins

#### User

1. Can only view their own profile
2. Cannot perform administrative actions 

### Note: Do not make any changes to the test case files or the workflows/scripts, as doing so will lead to automatic disqualification.

### What's Already Implemented

- Start by reading all the comments in the code. Anything marked as TODO is what you need to implement first.

1. **Database Schema** - Users table with role and status fields
2. **Basic API Structure** - Express server setup with middleware
3. **User Model** - Drizzle ORM setup with basic queries
4. **Basic Routes Structure** - Placeholder routes for all endpoints
5. **TypeScript Configuration** - Complete setup with proper types

### What You Need to Complete

## Getting Started

1. Install dependencies: `npm install`
2. Set up environment variables in `.env` ( important: add your credentials )
3. Run database migrations: `npm run migrate`
4. Seed initial data: `npm run seed`
5. Start development server: `npm run dev`
6. Run tests: `npm test`
7. Run tests with watch(optional): `npm test:watch`

## Hints

- Install PostgreSQL locally for development and testing purposes.
- Your goal is to ensure that all test cases pass while adhering to best practices. Use appropriate HTTP status codes and utilize the predefined custom errors from `errors.ts` wherever applicable.
- Carefully review all the code you have written, as your final implementation will be evaluated based on its quality and correctness.

## Test Data

The system will be seeded with:
Refer the seed.ts file for data make sure you done `npm run seed` to db before this
please refer the `seed.ts` for testing data

- 1 Super Admin (email: superadmin@test.com) (password: password123)
- 2 Admins (email: admin1@test.com, admin2@test.com)
- 5 Regular Users (email: user1@test.com - user5@test.com)

## Expected Deliverables

1. Complete implementation of all API endpoints
2. Proper error handling and validation
3. Role-based authorization throughout
4. All tests passing (public)
5. Clean, readable TypeScript code with proper types

**What you have to find out and implement first :**

```json
controller
   |___ authController.ts
   |___ userController.ts
middleware
   |___ auth.ts
utils
   |___ helpers.ts
   |
```

#### Note: Please go through all the source code, understand it thoroughly, and follow the comments for what needs to be done first.

#### 1. API Endpoints Implementation

Complete the following endpoints with proper authorization:

- `PUT /api/users/:id/role` - Only a Super Admin is authorized to change a user’s role, and the changes are limited to switching between the user and admin roles (not the superadmin role).
- `PUT /api/users/:id/status` - Activate/deactivate users
- `GET /api/users/:id` - Get user profile (with role-based access)
- `GET /api/users` - List users (admin/super admin only)

#### 2. Authorization Logic
- Validate user permissions for each action
- Ensure users can only perform allowed operations
- Handle edge cases (e.g., can't deactivate yourself)

## Project Structure
```
src/
├── config/          # configurations (db,ect) (TO COMPLETE)
├── controllers/     # API endpoint handlers (TO COMPLETE)
├── middleware/      # Auth middleware (PROVIDED)
├── models/          # Database models & types (PROVIDED)
├── routes/          # Route definitions (PROVIDED)
├── services/        # Business logic (TO COMPLETE)
├── types/           # TypeScript type definitions (PROVIDED)
├── utils/           # Helper functions (PROVIDED)
└── tests/           # Test files (PROVIDED)
```

## Evaluation Criteria (important)

- **Functionality** : All endpoints work as specified
- **Security** : Proper authorization and validation
- **Code Quality** : Clean, maintainable TypeScript code
- **Error Handling** : Appropriate error responses with status codes

## Submission Instructions

1. Complete all TODO comments in the codebase first.
2. Ensure all public tests pass.
3. Test your implementation thoroughly.
4. Submit a pull request with your changes from dev to main (important).
5. Include a brief description of your implementation approach.

## API Endpoints Reference

### Authentication (first implement auth)

- `POST /api/auth/login` - User login (pending)
- `POST /api/auth/register` - User registration (pending)

### User Management (make sure you passing all testcases)

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
- Implement proper error handling with custom types
- Follow TypeScript best practices

## Support
If you encounter any setup issues or have questions about requirements, please reach out to the technical team. Focus on implementing the core functionality first, then optimize and refine as time permits.