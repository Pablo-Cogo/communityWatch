import mongoose, { Document } from 'mongoose';
import { CUSTOM_VALIDATION } from '.';
import AuthService from '@src/services/auth';
import HelperService from '@src/services/helpers';

export interface User {
  _id?: string;
  userName: string;
  userEmail: string;
  userPassword: string;
  userImage?: string;
}

interface UserModel extends Omit<User, '_id'>, Document {}

const schema = new mongoose.Schema(
  {
    userName: { type: String, required: true, maxlength: 50 },
    userEmail: {
      type: String,
      required: true,
      unique: true,
      maxlength: 254,
    },
    userPassword: { type: String, required: true, maxlength: 60 },
    userImage: {
      type: String,
      required: false,
      validate: {
        validator: (value: string) => {
          return !value || HelperService.isValidUrl(value);
        },
        message: 'Invalid URL',
      },
      maxlength: 254,
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
  async (userEmail: string) => {
    const emailCount = await mongoose.models.User.countDocuments({ userEmail });
    return !emailCount;
  },
  'already exists in the database.',
  CUSTOM_VALIDATION.DUPLICATED
);

schema.pre<UserModel>('save', async function (): Promise<void> {
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
    console.error(`Error hashing password for the user ${this.userName}`);
  }
});

export const User = mongoose.model<UserModel>('User', schema);
