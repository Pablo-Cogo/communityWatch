import { Controller, Post } from '@overnightjs/core';
import { dbConnection } from '@src/database';
import { Resource } from '@src/entities/resource';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { Repository } from 'typeorm';

@Controller('resource')
export class ResourceController {
  private resourceRepository: Repository<Resource>;

  constructor() {
    this.resourceRepository = dbConnection.getRepository(Resource);
  }

  @Post('')
  public async create(req: Request, res: Response): Promise<void> {
    const resourceData = plainToClass(Resource, req.body);
    const errors = await validate(resourceData);

    if (errors.length > 0) {
      res.status(400).json({ errors });
      return;
    }

    const resource = await this.resourceRepository.save(resourceData);
    res.status(201).json(resource);
  }
}
