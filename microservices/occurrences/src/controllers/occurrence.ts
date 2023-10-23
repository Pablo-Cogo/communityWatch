import { Controller, Post } from '@overnightjs/core';
import { dbConnection } from '@src/database';
import { Occurrence } from '@src/entities/occurrence';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { Repository } from 'typeorm';

@Controller('occurrence')
export class OccurrenceController {
  private occurrenceRepository: Repository<Occurrence>;

  constructor() {
    this.occurrenceRepository = dbConnection.getRepository(Occurrence);
  }

  @Post('')
  public async create(req: Request, res: Response): Promise<void> {
    const occurrenceData = plainToClass(Occurrence, req.body);
    const errors = await validate(occurrenceData);

    if (errors.length > 0) {
      res.status(400).json({ errors });
      return;
    }

    const occurrence = await this.occurrenceRepository.save(occurrenceData);
    res.status(201).json(occurrence);
  }
}
