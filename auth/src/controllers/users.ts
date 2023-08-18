import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';

@Controller('users')
export class UserController {
  @Get('')
  public async create(req: Request, res: Response) {
    res.status(200).send(['teste']);
  }
}
