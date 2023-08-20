import mongoose, { Document } from 'mongoose';

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

interface AddressModel extends Omit<Address, '_id'>, Document {}

const schema = new mongoose.Schema(
  {
    addressState: { type: String, enum: ServedStates, required: true },
    addressCity: { type: String, enum: ServedCities, required: true },
    addressDistrict: { type: String, required: true, maxlength: 50 },
    addressStreet: { type: String, required: true, maxlength: 50 },
    addressNumber: { type: String, required: true, maxlength: 15 },
    addressZipCode: { type: String, required: false, maxlength: 8 },
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

export const Address = mongoose.model<AddressModel>('Address', schema);
