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
    match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect'],
    require: true,
  },
  avatarPath: {
    type: String,
    minLength: [5, 'Min length for avatar path is 5']
  },
  firstname: {
    type: String,
    require: true,
    minLength: [2, 'Min length for firstname is 2']
  },
  lastname: String,
}, {timestamps: true});

export const UserModel = model<UserDocument>('User', userSchema);
