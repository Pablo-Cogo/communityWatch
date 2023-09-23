import mongoose, { Document, Model } from 'mongoose';

export enum ServedStates {
  SANTA_CATARINA = 'SC',
}

export enum ServedCities {
  CHAPECO = 'Chapecó',
}

export interface Address {
  _id?: string;
  addressState: ServedStates;
  addressCity: ServedCities;
  addressDistrict: string;
  addressStreet: string;
  addressNumber: string;
  addressZipCode: string;
}

export interface IAddress extends Omit<Address, '_id'>, Document {}

const schema = new mongoose.Schema<IAddress>(
  {
    addressState: {
      type: String,
      enum: ServedStates,
      required: [true, 'O campo "Estado" é obrigatório.'],
    },
    addressCity: {
      type: String,
      enum: ServedCities,
      required: [true, 'O campo "Cidade" é obrigatório.'],
    },
    addressDistrict: {
      type: String,
      required: [true, 'O campo "Bairro" é obrigatório.'],
      maxlength: [50, 'O campo "Bairro" deve ter no máximo 50 caracteres.'],
    },
    addressStreet: {
      type: String,
      required: [true, 'O campo "Rua" é obrigatório.'],
      maxlength: [50, 'O campo "Rua" deve ter no máximo 50 caracteres.'],
    },
    addressNumber: {
      type: String,
      required: [true, 'O campo "Número" é obrigatório.'],
      maxlength: [15, 'O campo "Número" deve ter no máximo 15 caracteres.'],
    },
    addressZipCode: {
      type: String,
      maxlength: [8, 'O campo "CEP" deve ter no máximo 8 caracteres.'],
    },
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

schema.path('addressState').validate(function (value: string) {
  return Object.values(ServedStates).includes(value as ServedStates);
}, 'Estado inválido');

schema.path('addressCity').validate(function (value: string) {
  return Object.values(ServedCities).includes(value as ServedCities);
}, 'Cidade inválida');

export const Address: Model<IAddress> = mongoose.model<IAddress>(
  'Address',
  schema
);
