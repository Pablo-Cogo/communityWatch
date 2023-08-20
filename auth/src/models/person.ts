import mongoose, { Document, Schema } from 'mongoose';
import { CUSTOM_VALIDATION } from '.';
import HelperService from '@src/services/helpers';

export interface Person {
  _id?: string;
  personFullName: string;
  personCPF: string;
  personBirth: Date;
  personPhone?: string;
  userId: string;
  addressId: string;
}

interface PersonModel extends Omit<Person, '_id'>, Document {}

const schema = new mongoose.Schema(
  {
    personFullName: {
      type: String,
      required: true,
      minlenght: 3,
      maxlength: 60,
      validate: {
        validator: (value: string) => {
          return (
            HelperService.containsOnlyLetters(value) &&
            !HelperService.hasFourConsecutiveSameChars(value)
          );
        },
        message: 'Invalid Full Name',
      },
    },
    personCPF: {
      type: String,
      required: true,
      unique: true,
      maxlength: 11,
      validate: {
        validator: (value: string) => {
          return HelperService.isValidateCPF(value);
        },
        message: 'Invalid CPF',
      },
    },
    personBirth: { type: Date, required: true },
    personPhone: { type: String, required: false, maxlength: 11 },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
      unique: true,
    },
    addressId: {
      type: Schema.Types.ObjectId,
      ref: 'Address',
      required: false,
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

schema.path('personCPF').validate(
  async (personCPF: string) => {
    const cpfCount = await mongoose.models.Person.countDocuments({ personCPF });
    return !cpfCount;
  },
  'already exists in the database.',
  CUSTOM_VALIDATION.DUPLICATED
);

schema.pre<PersonModel>('save', async function (): Promise<void> {
  this.personCPF = HelperService.onlyNumbers(this.personCPF);
  if (this.personPhone)
    this.personPhone = HelperService.onlyNumbers(this.personPhone);
  else this.personPhone = '';
});

schema.path('userId').validate(
  async (userId: string) => {
    const userCount = await mongoose.models.Person.countDocuments({ userId });
    return !userCount;
  },
  'already exists in the database.',
  CUSTOM_VALIDATION.DUPLICATED
);

export const Person = mongoose.model<PersonModel>('Person', schema);
