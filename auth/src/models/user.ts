import mongoose, { Document } from 'mongoose';

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
    userName: { type: String, required: true },
    userEmail: {
      type: String,
      required: true,
      unique: true,
    },
    userPassword: { type: String, required: true },
    // userImage: {type: string}
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

export const User = mongoose.model<UserModel>('User', schema);
