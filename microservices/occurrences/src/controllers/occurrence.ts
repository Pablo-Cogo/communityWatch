import { Controller, Get, Post } from '@overnightjs/core';
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
      res.status(400).json({
        error: errors.map(
          (err) => err.constraints && Object.values(err.constraints)
        ),
      });
      return;
    }

    const occurrence = await this.occurrenceRepository.save(occurrenceData);
    res.status(201).json(occurrence);
  }

  @Get('')
  public async getById(req: Request, res: Response): Promise<void> {
    const id = req.query?.id ?? '';
    const getPdf = req.query?.getPdf === 'true';
    let occurrence: Occurrence | null = null;
    if (getPdf) {
      occurrence = await this.occurrenceRepository.findOne({
        select: [
          'id',
          'occurrenceCobradeCode',
          'occurrenceDescription',
          'occurrenceInitialDate',
          'occurrenceFinalDate',
          'occurrenceStatus',
          'userId',
          'occurrenceLinkPdf',
        ],
        where: { id: id.toString() },
      });
    } else {
      occurrence = await this.occurrenceRepository.findOne({
        select: [
          'id',
          'occurrenceCobradeCode',
          'occurrenceDescription',
          'occurrenceInitialDate',
          'occurrenceFinalDate',
          'userId',
          'occurrenceStatus',
        ],
        where: { id: id.toString() },
      });
    }

    res.status(200).json(occurrence);
  }

  @Get('list')
  public async list(_: Request, res: Response): Promise<void> {
    const occurrences = await this.occurrenceRepository.find({
      select: [
        'id',
        'occurrenceCobradeCode',
        'occurrenceDescription',
        'occurrenceInitialDate',
        'occurrenceFinalDate',
        'occurrenceStatus',
      ],
    });

    res.status(200).json(occurrences);
  }
}
