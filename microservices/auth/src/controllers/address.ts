import { Controller, Post } from '@overnightjs/core';
import { Request, Response } from 'express';
import { BaseController } from '.';
import { Address, IAddress } from '@src/models/address';
import HelperService from '@src/services/helpers';

/**
 * TODO
 * buscar dados por cep
 * https://viacep.com.br/ws/89809300/json/
 */
@Controller('address')
export class AddressController extends BaseController<IAddress> {
  constructor() {
    super(Address);
  }
  @Post('')
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const address = new Address({
        ...req.body,
        ...{
          addressZipCode: HelperService.onlyNumbers(req.body.addressZipCode),
        },
      });

      const newAddress = await address.save();
      res.status(201).send(newAddress);
    } catch (error) {
      this.sendCreateOrUpdateErrorResponse(res, error);
    }
  }
}
