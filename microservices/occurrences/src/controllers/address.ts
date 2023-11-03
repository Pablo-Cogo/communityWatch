import { Controller, Get, Post } from '@overnightjs/core';
import { dbConnection } from '@src/database';
import { Address } from '@src/entities/address';
import { Occurrence } from '@src/entities/occurrence';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { Repository } from 'typeorm';

@Controller('occurrence')
export class AddressController {
  private addressRepository: Repository<Address>;

  constructor() {
    this.addressRepository = dbConnection.getRepository(Address);
  }

  @Post('')
  public async create(req: Request, res: Response): Promise<void> {
    const occurrenceData = plainToClass(Occurrence, req.body);
    const errors = await validate(occurrenceData);

    if (errors.length > 0) {
      res.status(400).json({ errors });
      return;
    }

    const occurrence = await this.addressRepository.save(occurrenceData);
    res.status(201).json(occurrence);
  }

  @Get('list')
  public async list(req: Request, res: Response): Promise<void> {
    const occurrences = await this.addressRepository.find();
    res.status(200).json(occurrences);
  }
}
