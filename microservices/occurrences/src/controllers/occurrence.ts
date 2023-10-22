import { Controller, Get } from '@overnightjs/core';
import { Request, Response } from 'express';

@Controller('occurrence')
export class OccurrenceController {
  @Get('')
  public async create(req: Request, res: Response): Promise<void> {
    res.status(200).send(['teste']);
  }
}
