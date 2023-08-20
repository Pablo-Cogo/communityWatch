import * as http from 'http';
import { userRole } from './models/user';

declare module 'express-serve-static-core' {
  export interface Request extends http.IncomingMessage, Express.Request {
    context: {
      userId?: string;
      role?: userRole;
    };
  }
}
