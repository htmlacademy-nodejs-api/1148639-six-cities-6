import { User } from '../../types/user.type.js';

import { defaultClasses, prop, getModelForClass } from '@typegoose/typegoose';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements User {

  @prop({
    required: true,
    unique: true,
    match: [/^([\w-\\.]+@([\w-]+\.)+[\w-]{2,4})?$/, 'Email is incorrect'],
  })
  public email: string;

  @prop({
    required: false,
    default: '',
  })
  public avatarPath: string;

  @prop({
    required: true,
    minLength: [2, 'Min length for lastname is 2'],

  })
  public lastname: string;

  @prop({
    required: true,
    minLength: [2, 'Min length firsname is 2']
  })
  public firstname: string;
};

export const UserModel = getModelForClass(UserEntity);
