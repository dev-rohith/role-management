import jwt, { SignOptions } from 'jsonwebtoken';

const SECRET: string = process.env.JWT_SECRET ?? 'secret';

export function signToken(payload: object, expiresIn: number = 3600): string {
  const options: SignOptions = { expiresIn };
  return jwt.sign(payload, SECRET, options);
}

export function verifyToken(token: string): any {
  return jwt.verify(token, SECRET);
}
