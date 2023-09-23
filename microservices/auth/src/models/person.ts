import mongoose, { Document, Model, Schema } from 'mongoose';
import { CUSTOM_VALIDATION } from '.';
import HelperService from '@src/services/helpers';

export interface Person {
  _id?: string;
  personFullName: string;
  personCPF: string;
  personBirth: Date;
  personPhone?: string;
  userId: Schema.Types.ObjectId;
  addressId: Schema.Types.ObjectId;
}

export interface IPerson extends Omit<Person, '_id'>, Document {}

const schema = new mongoose.Schema<IPerson>(
  {
    personFullName: {
      type: String,
      describe: 'Nome de usuário',
      required: [true, 'O campo é obrigatório.'],
      minlength: [3, 'O campo deve ter no mínimo 3 caracteres.'],
      maxlength: [60, 'O campo deve ter no máximo 60 caracteres.'],
      validate: {
        validator: (value: string) => {
          return (
            HelperService.containsOnlyLetters(value) &&
            !HelperService.hasFourConsecutiveSameChars(value)
          );
        },
        message: 'Nome completo inválido',
      },
    },
    personCPF: {
      type: String,
      describe: 'CPF',
      required: [true, 'O campo é obrigatório.'],
      unique: true,
      maxlength: [11, 'O campo deve ter no máximo 11 caracteres.'],
      validate: {
        validator: (value: string) => {
          return HelperService.isValidateCPF(value);
        },
        message: 'Campo inválido',
      },
    },
    personBirth: {
      type: Date,
      describe: 'Data de nascimento',
      required: [true, 'O campo é obrigatório.'],
    },
    personPhone: {
      type: String,
      describe: 'Telefone',
      required: [false],
      maxlength: [11, 'O campo deve ter no máximo 11 caracteres.'],
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'O campo é obrigatório.'],
      unique: true,
    },
    addressId: {
      type: Schema.Types.ObjectId,
      ref: 'Address',
      required: [false],
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
  'Já existe na base de dados.',
  CUSTOM_VALIDATION.DUPLICATED
);

schema.pre<IPerson>('save', async function (): Promise<void> {
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
  'Já existe na base de dados.',
  CUSTOM_VALIDATION.DUPLICATED
);

export const Person: Model<IPerson> = mongoose.model<IPerson>('Person', schema);
