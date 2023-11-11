import { Controller, Delete, Get, Post, Put } from '@overnightjs/core';
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

  @Put('')
  public async editOccurrence(req: Request, res: Response): Promise<void> {
    const id = req.query?.id ?? '';
    const updatedData = req.body;
    const existingOccurrence = await this.occurrenceRepository.findOne({
      where: { id: id.toString() },
    });

    if (!existingOccurrence) {
      res.status(304).json({ error: 'Erro ao obter a ocorrencia.' });
      return;
    }

    Object.assign(existingOccurrence, updatedData);

    const updatedOccurrence = await this.occurrenceRepository.save(
      existingOccurrence
    );

    res.status(200).json(updatedOccurrence);
  }

  @Delete('')
  public async deleteOccurrence(req: Request, res: Response): Promise<void> {
    const occurrenceId = req.query?.id;

    if (!occurrenceId) {
      res.status(400).json({ error: 'ID de ocorrência é obrigatório.' });
      return;
    }

    try {
      const occurrence = await this.occurrenceRepository.findOneOrFail({
        where: { id: occurrenceId.toString() },
      });

      await this.occurrenceRepository.remove(occurrence);

      res.status(200).json(true);
    } catch (error) {
      res.status(404).json({ error: 'Ocorrência não encontrada.' });
    }
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

  @Get('resources')
  public async getResourcesByOccurrenceId(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const { occurrenceId } = req.query;

      const occurrence = await this.occurrenceRepository.findOne({
        relations: ['resources'],
        select: ['resources', 'id'],
        where: { id: occurrenceId?.toString() },
      });

      if (!occurrence) {
        res.status(404).json({ message: 'Ocorrência não encontrada' });
        return;
      }

      const resources = occurrence.resources;

      res.status(200).json(resources);
    } catch (error) {
      res
        .status(500)
        .json({ error: 'Ocorreu um erro ao buscar os recursos da ocorrência' });
    }
  }
}
