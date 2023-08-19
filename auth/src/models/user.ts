import mongoose, { Document } from 'mongoose';
import { AuthService } from '@src/services/auth';

export interface User {
  _id?: string;
  userName: string;
  userEmail: string;
  userPassword: string;
  userImage?: string;
}

export enum CUSTOM_VALIDATION {
  DUPLICATED = 'DUPLICATED',
}

interface UserModel extends Omit<User, '_id'>, Document {}

const schema = new mongoose.Schema(
  {
    userName: { type: String, required: true },
    userEmail: {
      type: String,
      required: true,
      unique: true,
    },
    userPassword: { type: String, required: true },
    userImage: { type: String, required: false },
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

  try {
    const hashedPassword = await AuthService.hashPassword(this.userPassword);
    this.userPassword = hashedPassword;
  } catch (error) {
    console.error(`Error hashing password for the user ${this.userName}`);
  }
});

export const User = mongoose.model<UserModel>('User', schema);
