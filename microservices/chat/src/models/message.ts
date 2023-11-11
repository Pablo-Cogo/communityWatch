import mongoose, { Document, Model } from 'mongoose';

export interface Message {
  _id?: string;
  userId: string;
  serviceId: string;
  messageValue: string; //quando for arquivo esse campo ficará vazio
  messageDate: Date;
  messageArquive: string; //será guardado apenas o nome e extensão do arquivo, e salvo em codigo o caminho da pasta no servidor
}

export interface IMessage extends Omit<Message, '_id'>, Document {}

const schema = new mongoose.Schema<IMessage>(
  {
    userId: { type: String, required: true },
    serviceId: { type: String, required: true },
    messageValue: { type: String, required: false },
    messageDate: { type: Date, required: true },
    messageArquive: { type: String, required: false },
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

export const Message: Model<IMessage> = mongoose.model<IMessage>(
  'Message',
  schema
);
