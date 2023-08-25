import { ClassMiddleware, Controller, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import { BaseController } from '.';
import { Person } from '@src/models/person';
import { authMiddleware } from '@src/middlewares/auth';
import HelperService from '@src/services/helpers';

@Controller('person')
@ClassMiddleware(authMiddleware)
export class PersonController extends BaseController {
  @Post('')
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const person = new Person({
        ...req.body,
        ...{ personCPF: HelperService.onlyNumbers(req.body.personCPF) },
        ...{ personPhone: HelperService.onlyNumbers(req.body.personPhone) },
        ...{ userId: req.context?.userId },
      });
      const newPerson = await person.save();
      res.status(201).send(newPerson);
    } catch (error) {
      this.sendCreateOrUpdateErrorResponse(res, error);
    }
  }
}
