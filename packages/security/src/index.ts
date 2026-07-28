import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';

export class PasswordHelper {
  static async hash(password: string, rounds = 10): Promise<string> {
    return bcrypt.hash(password, rounds);
  }

  static async verify(password: string, hash: string): Promise<boolean> {
    return bcrypt.compare(password, hash);
  }
}

export class TokenHelper {
  static sign(payload: string | Buffer | object, secret: string, expiresIn: string | number = '1h'): string {
    return jwt.sign(payload, secret, { expiresIn: expiresIn as any });
  }

  static verify<T>(token: string, secret: string): T {
    return jwt.verify(token, secret) as T;
  }
}
