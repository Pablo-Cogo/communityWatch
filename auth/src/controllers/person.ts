import { ClassMiddleware, Controller, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import { BaseController } from '.';
import { Person } from '@src/models/person';
import { authMiddleware } from '@src/middlewares/auth';
import Helpers from '@src/util/helpers';

@Controller('person')
@ClassMiddleware(authMiddleware)
export class PersonController extends BaseController {
  @Post('')
  public async create(req: Request, res: Response): Promise<void> {
    const { personFullName, personBirth } = req.body;
    let { personCPF, personPhone } = req.body;
    try {
      personCPF = Helpers.onlyNumbers(personCPF);
      personPhone = Helpers.onlyNumbers(personPhone);
      const person = new Person({
        personFullName,
        personBirth,
        personCPF,
        personPhone,
        userId: req.context?.userId,
      });
      const newPerson = await person.save();
      res.status(201).send(newPerson);
    } catch (error) {
      this.sendCreateOrUpdateErrorResponse(res, error);
    }
  }
}
