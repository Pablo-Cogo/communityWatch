import { Controller, Delete, Get, Post, Put } from '@overnightjs/core';
import { dbConnection } from '@src/database';
import { Occurrence } from '@src/entities/occurrence';
import { Resource } from '@src/entities/resource';
import { plainToClass } from 'class-transformer';
import { validate } from 'class-validator';
import { Request, Response } from 'express';
import { Repository } from 'typeorm';

@Controller('resource')
export class ResourceController {
  private resourceRepository: Repository<Resource>;
  private occurrenceRepository: Repository<Occurrence>;

  constructor() {
    this.resourceRepository = dbConnection.getRepository(Resource);
    this.occurrenceRepository = dbConnection.getRepository(Occurrence);
  }

  @Post('')
  public async create(req: Request, res: Response): Promise<void> {
    const resourceData = plainToClass(Resource, req.body);
    const errors = await validate(resourceData);

    if (errors.length > 0) {
      res.status(400).json({
        error: errors.map(
          (err) => err.constraints && Object.values(err.constraints)
        ),
      });
      return;
    }

    const resource = await this.resourceRepository.save(resourceData);
    res.status(201).json(resource);
  }

  @Get('list')
  public async list(_: Request, res: Response): Promise<void> {
    const resources = await this.resourceRepository.find();
    res.status(200).json(resources);
  }

  @Get('')
  public async getById(req: Request, res: Response): Promise<void> {
    const id = req.query?.id ?? '';
    const resources = await this.resourceRepository.findOne({
      where: { id: id.toString() },
    });
    res.status(200).json(resources);
  }

  @Put('')
  public async editResource(req: Request, res: Response): Promise<void> {
    const id = req.query?.id ?? '';
    const updatedData = req.body;
    const existingResource = await this.resourceRepository.findOne({
      where: { id: id.toString() },
    });

    if (!existingResource) {
      res.status(304).json({ error: 'Erro ao obter o recurso.' });
      return;
    }

    Object.assign(existingResource, updatedData);

    const updatedResource = await this.resourceRepository.save(
      existingResource
    );

    res.status(200).json(updatedResource);
  }

  @Delete('')
  public async deleteResource(req: Request, res: Response): Promise<void> {
    const id = req.query?.id ?? '';

    const existingResource = await this.resourceRepository.findOne({
      where: { id: id.toString() },
    });

    if (!existingResource) {
      res.status(404).json({ error: 'Recurso não encontrado.' });
      return;
    }
    await this.resourceRepository.remove(existingResource);
    res.status(204).send();
  }

  @Get('unlinked')
  public async getUnlinkedResourcesByOccurrenceId(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const occurrenceId = req.query.occurrenceId as string;

      if (!occurrenceId) {
        res
          .status(400)
          .json({ error: 'O parâmetro occurrenceId é obrigatório.' });
        return;
      }

      const unlinkedResources = await this.resourceRepository
        .createQueryBuilder('resource')
        .where((qb) => {
          const subQuery = qb
            .subQuery()
            .select('occurrence_resources.resourceId')
            .from('occurrence_resources', 'occurrence_resources')
            .where('occurrence_resources.occurrenceId = :occurrenceId', {
              occurrenceId,
            })
            .getQuery();
          return 'resource.id NOT IN ' + subQuery;
        })
        .getMany();

      console.log(unlinkedResources);
      res.status(200).json(unlinkedResources);
    } catch (error) {
      res.status(500).json({
        error: 'Erro ao buscar recursos não vinculados à ocorrência.',
      });
    }
  }

  @Put('linkOccurrence')
  public async linkOccurrence(req: Request, res: Response): Promise<void> {
    const resourceId = req.query.resourceId;
    const occurrenceId = req.query.occurrenceId;

    if (!resourceId || !occurrenceId) {
      res
        .status(400)
        .json({ error: 'IDs de recurso e ocorrência são obrigatórios.' });
      return;
    }

    const resource = await this.resourceRepository.findOne({
      relations: ['occurrences'],
      select: ['occurrences', 'id'],
      where: { id: resourceId?.toString() },
    });

    const occurrence = await this.occurrenceRepository.findOne({
      relations: ['resources'],
      select: ['resources', 'id'],
      where: { id: occurrenceId?.toString() },
    });

    if (!resource || !occurrence) {
      res.status(404).json({ error: 'Recurso ou ocorrência não encontrados.' });
      return;
    }

    resource.occurrences.push(occurrence);

    await this.resourceRepository.save(resource);

    res.status(200).json(true);
  }

  @Delete('unlinkOccurrence')
  public async unlinkOccurrence(req: Request, res: Response): Promise<void> {
    const resourceId = req.query.resourceId;
    const occurrenceId = req.query.occurrenceId;

    if (!resourceId || !occurrenceId) {
      res
        .status(400)
        .json({ error: 'IDs de recurso e ocorrência são obrigatórios.' });
      return;
    }

    const resource = await this.resourceRepository.findOne({
      relations: ['occurrences'],
      select: ['occurrences', 'id'],
      where: { id: resourceId?.toString() },
    });

    const occurrence = await this.occurrenceRepository.findOne({
      relations: ['resources'],
      select: ['resources', 'id'],
      where: { id: occurrenceId?.toString() },
    });

    if (!resource || !occurrence) {
      res.status(404).json({ error: 'Recurso ou ocorrência não encontrados.' });
      return;
    }

    // Remove a ocorrência do array de ocorrências do recurso
    resource.occurrences = resource.occurrences.filter(
      (occur) => occur.id !== occurrence.id
    );

    await this.resourceRepository.save(resource);

    res.status(200).json(true);
  }
}
