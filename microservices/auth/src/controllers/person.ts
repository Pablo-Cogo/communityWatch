import { Controller, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import { BaseController } from '.';
import { Person, IPerson } from '@src/models/person';
import HelperService from '@src/services/helpers';

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
}
