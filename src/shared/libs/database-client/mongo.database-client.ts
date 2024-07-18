import * as Mongoose from 'mongoose';
import { setTimeout } from 'node:timers/promises';
import { inject, injectable } from 'inversify';
import { Component } from '../../types/index.js';
import { Logger } from '../logger/index.js';
import { DatabaseClient } from './database-client.inteface.js';

const RETRY_COUNT = 5;
const RETRY_TIMEOUT = 1000;

@injectable()
export class MongoDatabaseClient implements DatabaseClient {
  private mongoose: typeof Mongoose;
  private isConnected: boolean;
  constructor(
    @inject(Component.Logger) private logger: Logger,
  ) {
    this.isConnected = false;
  }

  public isConnectedToDatabase = (): boolean => {
    return this.isConnected;
  }

  public connect = async (uri: string): Promise<void> => {
    if (this.isConnectedToDatabase()) {
      throw new Error('Database client already conntected.');
    }

    this.logger.info('Trying to conntect to this MongoDB...');

    let attempt = 0;
    while (attempt < RETRY_COUNT) {
      try {
        this.mongoose = await Mongoose.connect(uri);
        this.isConnected = true;
        this.logger.info('Database conntection estableshed.');
        return;
      } catch (err) {
        attempt++;
        this.logger.error(`Filed to conntected to the database. Attempt: ${attempt}`, err as Error);
        await setTimeout(RETRY_TIMEOUT);
      }
    }

    throw new Error(`Unable to establish conntection database after ${RETRY_COUNT}`);
  }

  public disconnect = async (): Promise<void> => {
    if (!this.isConnectedToDatabase()) {
      throw new Error('Not to connected to the database.');
    }

    await this.mongoose.disconnect?.();
    this.isConnected = false;
    this.logger.info('Database connection closed.');
  }
}
