import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';

@Controller('auth')
export class AuthController {
  @Get('create')
  public async create(req: Request, res: Response) {
    res.status(200).send(['teste']);
  }
}
