import mongoose, { Document } from 'mongoose';

export interface Service {
  _id?: string;
  serviceOpenDate: Date;
  serviceFinishDate: Date;
  serviceStatus: number;
  serviceReporter: string;
  serviceAttendant: string;
}

export enum status {
  open = 1, //cliente abriu atendimento, e informará as primeiras informações antes de um usuário atendê-lo
  waiting = 2, //atendimento aguardando atendente
  inService = 3, //atendimento em andamento com um usuário
  processing = 4, //atendimento em processo de abertura de ocorrência
  finish = 5, //atendimento encerrado
}

export interface IService extends Omit<Service, '_id'>, Document {}

const schema = new mongoose.Schema(
  {
    serviceOpenDate: { type: Date, required: true },
    serviceFinishDate: { type: Date, required: false },
    serviceStatus: { type: Number, require: true },
    serviceReporter: { type: String, require: true },
    serviceAttendant: { type: String, require: false },
  },
  {
    toJSON: {
      transform: (_, ret): void => {
        ret.id = ret._id;
        delete ret._id;
        delete ret.__v;
      },
    },
  }
);

export const Service = mongoose.model<IService>('Service', schema);
