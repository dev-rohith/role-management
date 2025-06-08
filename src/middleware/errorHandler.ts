import type { Request, Response, NextFunction } from 'express';
import { AppError } from '../utils/errors';

export const errorHandler = (
  error: Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  const isDev = process.env.NODE_ENV === 'development';

  if (error instanceof AppError) {
    res.status(error.statusCode).json({
      message: error.message,
      ...(isDev && { stack: error.stack })
    });
  } else {
    console.error('Unhandled error:', error);
    res.status(500).json({
      error: 'Internal server error',
      ...(isDev && { stack: error.stack })
    });
  }
};
