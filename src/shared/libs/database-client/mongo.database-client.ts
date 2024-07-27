import * as Mongoose from 'mongoose';

import { Component } from '../../types/component.enum.js';
import { Logger } from '../logger/index.js';
import { DatabaseClient } from './database-client.interface.js';
import {inject, injectable} from 'inversify';

const RETRY_COUNT = 5;
const RENTRY_TIMEOUT = 1000;

@injectable()
export class MongoDatabaseClient implements DatabaseClient {
  private isConntected: boolean;
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
  ) {
    this.isConntected = false;
  }

  public connect = async(uri: string): Promise<void> => {
    
  }
}