import { Controller, Post, Get, Patch } from '@overnightjs/core';
import { Request, Response } from 'express';
import { BaseController } from '.';
import { IService, Service } from '@src/models/service';

@Controller('service')
export class ServiceController extends BaseController<IService> {
  constructor() {
    super(Service);
  }

  @Post('')
  public async create(req: Request, res: Response): Promise<void> {
    try {
      const service = new Service({
        ...req.body,
        ...{ serviceOpenDate: req.body.serviceOpenDate },
        ...{ serviceStatus: req.body.serviceStatus },
        ...{ serviceReporter: req.body.serviceReporter },
      });
      const newService = await service.save();
      res.status(201).send(newService);
    } catch (error) {
      this.sendCreateOrUpdateErrorResponse(res, error);
    }
  }

  @Get('')
  public async getServices(req: Request, res: Response): Promise<void> {
    try {
      const value = req.body?.['value'];
      const secundValue = req.body?.['secundvalue'];
      const property = req.body?.['property']?.toString();
      const propertyString = property ? property.toString() : '';
      let service;

      if (propertyString === 'id') {
        service = await Service.findOne({ _id: value });
      } else if (
        propertyString === 'serviceOpenDate' ||
        propertyString === 'serviceFinishDate'
      ) {
        service = await Service.find({
          [propertyString]: {
            $gte: value,
            $lte: secundValue,
          },
        });
      } else {
        service = await Service.findOne({ [propertyString]: value });
      }

      if (service) {
        res.status(200).send(service);
        return;
      }
      res
        .status(404)
        .send(
          'Não foi encontrado nenhum registro com as informações enviadas!'
        );
    } catch (error) {
      this.sendCreateOrUpdateErrorResponse(res, error);
    }
  }

  @Patch('updateStatus')
  public async updateStatus(req: Request, res: Response): Promise<void> {
    try {
      const id = req.body?.['id'];
      const statusReq = req.body?.['status'];

      if (!statusReq) {
        res.status(304).send('The status is invalid!');
        return;
      } else {
        const resp = await Service.updateOne(
          { _id: id },
          { $set: { serviceStatus: statusReq } }
        );
        res.status(200).send(resp);
        return;
      }
    } catch (error) {
      this.sendCreateOrUpdateErrorResponse(res, error);
    }
  }
}
