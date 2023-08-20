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
    try {
      const person = new Person({
        ...req.body,
        ...{ personCPF: Helpers.onlyNumbers(req.body.personCPF) },
        ...{ personPhone: Helpers.onlyNumbers(req.body.personPhone) },
        ...{ userId: req.context?.userId },
      });
      const newPerson = await person.save();
      res.status(201).send(newPerson);
    } catch (error) {
      this.sendCreateOrUpdateErrorResponse(res, error);
    }
  }
}
