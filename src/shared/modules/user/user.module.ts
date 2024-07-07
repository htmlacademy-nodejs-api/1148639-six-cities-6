import { Document, Schema, model } from 'mongoose';
import { User } from '../../types/index.js'


interface UserDocument extends User, Document {
  createdAt: Date,
  updateAt: Date,
}

const userSchema = new Schema({
  email: {
    type: String,
    unique: true,
  },
  avatarPath: String,
  firstname: String,
  lastname: String,
}, {timestamps: true});

export const UserModel = model<UserDocument>('User', userSchema);
