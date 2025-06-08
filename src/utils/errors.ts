export class AppError extends Error {
  statusCode: number;       // HTTP status code (e.g. 400, 401, 403)
  isOperational: boolean;   // Marks expected/operational errors vs programming errors

  constructor(message: string, statusCode: number) {
    super(message);
    this.statusCode = statusCode;
    this.isOperational = true;

    Error.captureStackTrace(this, this.constructor);
  }
}

// 401 Unauthorized - authentication required or failed
export class UnauthorizedError extends AppError {
  constructor(message = 'Unauthorized') {
    super(message, 401);
  }
}

// 403 Forbidden - authenticated but lacks permission
export class ForbiddenError extends AppError {
  constructor(message = 'Forbidden') {
    super(message, 403);
  }
}

// 400 Bad Request - validation or client input error
export class ValidationError extends AppError {
  constructor(message = 'Validation failed') {
    super(message, 400);
  }
}

// 409 Conflict - resource conflict, e.g. duplicate entry
export class ConflictError extends AppError {
  constructor(message = 'Conflict') {
    super(message, 409);
  }
}


//you can create you own error object if needed follow best practices