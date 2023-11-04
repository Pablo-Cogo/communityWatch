import { Controller, Get, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import { BaseController } from '.';
import { Person, IPerson } from '@src/models/person';
import HelperService from '@src/services/helpers';
import { Types } from 'mongoose';

@Controller('person')
export class PersonController extends BaseController<IPerson> {
  constructor() {
    super(Person);
  }

  @Post('')
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const person = new Person({
        ...req.body,
        ...{ personCPF: HelperService.onlyNumbers(req.body.personCPF) },
        ...{ personPhone: HelperService.onlyNumbers(req.body.personPhone) },
      });
      const newPerson = await person.save();
      res.status(201).send(newPerson);
    } catch (error) {
      this.sendCreateOrUpdateErrorResponse(res, error);
    }
  }

  @Get('')
  public async getPersonById(req: Request, res: Response): Promise<void> {
    try {
      const id = (req.query?.id ?? '').toString();
      if (!id || !Types.ObjectId.isValid(id)) {
        res.send({ code: 400, error: 'Usuário não encontrado!' });
        return;
      }
      const newPerson = await Person.findOne({
        userId: id,
      });
      res.status(200).send(newPerson);
    } catch (error) {
      this.sendCreateOrUpdateErrorResponse(res, error);
    }
  }

  @Get('filterByCpf')
  public async getPersonByCpf(req: Request, res: Response): Promise<void> {
    try {
      const cpf = new String(req.query?.personCPF ?? '');
      const newPerson = await Person.findOne({
        personCPF: cpf.replace(/\D/g, ''),
      });
      res.status(200).send(newPerson);
    } catch (error) {
      this.sendCreateOrUpdateErrorResponse(res, error);
    }
  }
}
