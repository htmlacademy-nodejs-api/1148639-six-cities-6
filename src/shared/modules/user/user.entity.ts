import { User } from '../../types/user.type.js';

import { defaultClasses, prop, getModelForClass, modelOptions } from '@typegoose/typegoose';

import { createHMAC256 } from '../../helpers/hash.js';

// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export interface UserEntity extends defaultClasses.Base {}

@modelOptions({
  schemaOptions: {
    collection: 'users',
    timestamps: true,
  }
})
// eslint-disable-next-line @typescript-eslint/no-unsafe-declaration-merging
export class UserEntity extends defaultClasses.TimeStamps implements User {

  @prop({
    required: true,
    default: '',
  })
  private password: string;

  @prop({
    required: true,
    unique: true,
  })
  public email: string;

  @prop({
    required: false,
    default: '',
  })
  public avatarPath: string;

  @prop({
    required: true,
    default: '',
  })
  public lastname: string;

  @prop({
    required: true,
    default: '',
  })
  public firstname: string;

  constructor(userData: User) {
    super();

    this.email = userData.email;
    this.avatarPath = userData.avatarPath;
    this.firstname = userData.firstname;
    this.lastname = userData.firstname;
  }

  public setPassword = (line: string, salt: string): void => {
    this.password = createHMAC256(line, salt);
  }

  public getPassword = () => {
    return this.password;
  }
};

export const UserModel = getModelForClass(UserEntity);
