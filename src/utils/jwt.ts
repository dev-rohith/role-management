import jwt from 'jsonwebtoken';

const SECRET = process.env.JWT_SECRET || 'secret';

export function signToken(payload: object, expiresIn: string = '1h'): string {
  return jwt.sign(payload, SECRET, { expiresIn });
}

export function verifyToken(token: string): any {
  return jwt.verify(token, SECRET);
}