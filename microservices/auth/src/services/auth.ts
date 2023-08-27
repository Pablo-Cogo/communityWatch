import { userRole } from '@src/models/user';
import bcrypt from 'bcrypt';
import config from 'config';
import jwt from 'jsonwebtoken';

export interface JwtToken {
  sub: string;
  role: userRole;
}

export default class AuthService {
  public static async hashPassword(
    password: string,
    salt = 10
  ): Promise<string> {
    return await bcrypt.hash(password, salt);
  }

  public static async comparePasswords(
    password: string,
    hashedPassword: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hashedPassword);
  }

  public static generateToken(sub: string, role: userRole): string {
    return jwt.sign({ sub, role }, config.get<string>('App.auth.key'), {
      expiresIn: config.get('App.auth.tokenExpiresIn'),
    });
  }

  public static decodeToken(token: string): JwtToken {
    return jwt.verify(token, config.get('App.auth.key')) as JwtToken;
  }
}