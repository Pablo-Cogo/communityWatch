import { ClassMiddleware, Controller, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import { BaseController } from '.';
import { authMiddleware } from '@src/middlewares/auth';
import { Address } from '@src/models/address';
import { Person } from '@src/models/person';
import HelperService from '@src/services/helpers';

/**
 * TODO
 * buscar dados por cep
 * https://viacep.com.br/ws/89809300/json/
 */
@Controller('address')
@ClassMiddleware(authMiddleware)
export class AddressController extends BaseController {
  @Post('')
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const address = new Address({
        ...req.body,
        ...{
          addressZipCode: HelperService.onlyNumbers(req.body.addressZipCode),
        },
      });

      const person = await Person.findOneAndUpdate(
        { userId: req.context?.userId },
        { addressId: address.id }
      );

      if (!person) {
        res.status(400).send({
          code: 400,
          error: 'Person not found',
        });
        return;
      }

      const newAddress = await address.save();
      res.status(201).send(newAddress);
    } catch (error) {
      this.sendCreateOrUpdateErrorResponse(res, error);
    }
  }
}
