import mongoose, { Document, Model } from 'mongoose';
import { CUSTOM_VALIDATION } from '.';
import AuthService from '@src/services/auth';
import HelperService from '@src/services/helpers';

export enum userRole {
  admin = 0,
  employee = 1,
  user = 2,
}

export interface User {
  _id?: string;
  userName: string;
  userEmail: string;
  userPassword?: string;
  userRole: userRole;
  userImage?: string;
}

export interface IUser extends Omit<User, '_id'>, Document {}

const schema = new mongoose.Schema<IUser>(
  {
    userName: {
      type: String,
      describe: 'Nome de usuário',
      required: [true, 'O campo é obrigatório.'],
      maxlength: [50, 'O campo deve ter no máximo 50 caracteres.'],
    },
    userEmail: {
      type: String,
      describe: 'Email',
      required: [true, 'O campo é obrigatório.'],
      unique: true,
      maxlength: [254, 'O campo deve ter no máximo 254 caracteres.'],
    },
    userPassword: {
      type: String,
      describe: 'Senha',
      required: [false],
      maxlength: [60, 'O campo deve ter no máximo 60 caracteres.'],
    },
    userRole: {
      type: Number,
      describe: 'Papal do usuário',
      enum: userRole,
      required: [true, 'O campo é obrigatório.'],
      default: userRole.user,
    },
    userImage: {
      type: String,
      describe: 'Imagem de perfil',
      required: [false],
      validate: {
        validator: (value: string) => {
          return !value || HelperService.isValidUrl(value);
        },
        message: 'URL inválida',
      },
      maxlength: [254, 'O campo deve ter no máximo 254 caracteres.'],
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

schema.path('userEmail').validate(
  async function (userEmail: string) {
    const emailCount = await mongoose.models.User.countDocuments({ userEmail });
    return emailCount === 0; // Corrigido para retornar true se o email não existir
  },
  'Já existe na base de dados.',
  CUSTOM_VALIDATION.DUPLICATED
);

schema.pre<User & Document>('save', async function (): Promise<void> {
  if (!this.userPassword || !this.isModified('userPassword')) {
    return;
  }

  if (!this.userImage) {
    this.userImage = '';
  }

  try {
    const hashedPassword = await AuthService.hashPassword(this.userPassword);
    this.userPassword = hashedPassword;
  } catch (error) {
    console.error(
      `Erro ao fazer o hash da senha para o usuário ${this.userName}`
    );
    throw error;
  }
});

export const User: Model<IUser> = mongoose.model<IUser>('User', schema);
