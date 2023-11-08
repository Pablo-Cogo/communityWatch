import { Controller, Post, Get, Delete, Patch, Put } from '@overnightjs/core';
import { Request, Response } from 'express';
import { BaseController } from '.';
import { IMessage, Message } from '@src/models/message';

@Controller('message')
export class MessageController extends BaseController<IMessage> {
  constructor() {
    super(Message);
  }
  //cria uma mensagem
  @Post('')
  public async createMessage(req: Request, res: Response): Promise<void> {
    try {
      const message = new Message({
        ...req.body,
        ...{ userId: req.body.userId },
        ...{ serviceId: req.body.serviceId },
        ...{ messageValue: req.body.messageValue },
        ...{ messageDate: req.body.messageDate },
        ...{ messageArquive: req.body.messageArquive },
      });
      const newMessage = await message.save();
      res.status(201).send(newMessage);
    } catch (error) {
      this.sendCreateOrUpdateErrorResponse(res, error);
    }
  }
  //busca uma mensagem por id
  @Get('')
  public async getOneMessage(req: Request, res: Response): Promise<void> {
    try {
      const id = req.headers?.['id'];
      const message = await Message.findOne({ _id: id });
      console.log(message);
      if (message) {
        res.status(200).send({
          userId: message.userId,
          serviceId: message.serviceId,
          messageValue: message.messageValue,
          messageDate: message.messageDate,
          messageArquive: message.messageArquive,
        });
        return;
      }
      res.status(200).send(false);
    } catch (error) {
      this.sendCreateOrUpdateErrorResponse(res, error);
    }
  }
  //lista todas as mensagens de um service (atendimento)
  @Get('all')
  public async getAllMessages(req: Request, res: Response): Promise<void> {
    try {
      const serviceId = req.headers?.['id'];
      const messages = await Message.find({ serviceId: serviceId });
      if (messages) {
        res.status(200).send(messages);
        return;
      }
      res.status(200).send(false);
    } catch (error) {
      this.sendCreateOrUpdateErrorResponse(res, error);
    }
  }
  //deleta uma mensagem usando o id
  @Delete('')
  public async deleteMessage(req: Request, res: Response): Promise<void> {
    try {
      const id = req.headers?.['id'];
      const resp = await Message.deleteOne({ _id: id });
      res.status(200).send(resp);
      return;
    } catch (error) {
      this.sendCreateOrUpdateErrorResponse(res, error);
    }
  }
  //atualiza apenas o texto da mensagem
  @Patch('')
  public async updateMessageValue(req: Request, res: Response): Promise<void> {
    try {
      const id = req.headers?.['id'];
      const value = req.body?.['messageValue'];
      if (validate(value)) {
        res.status(304).send('Error: The messageValue cant be null or empty!');
        return;
      }

      const resp = await Message.updateOne(
        { _id: id },
        { $set: { messageValue: value } }
      );

      res.status(200).send(resp);
      return;
    } catch (error) {
      this.sendCreateOrUpdateErrorResponse(res, error);
    }
  }
  @Put('')
  public async updateCompleteMessage(
    req: Request,
    res: Response
  ): Promise<void> {
    try {
      const id = req.headers?.['id'];
      const value = req.body;
      if (validate(value)) {
        res.status(304).send('Error: The messageValue cant be null or empty!');
        return;
      }

      const resp = await Message.replaceOne({ _id: id }, value);

      res.status(200).send(resp);
      return;
    } catch (error) {
      this.sendCreateOrUpdateErrorResponse(res, error);
    }
  }
}
function validate(value: string) {
  return value === '' || value == null ? true : false;
}
