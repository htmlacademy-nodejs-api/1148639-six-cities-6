import { injectable, inject } from 'inversify';

import { Component } from '../shared/types/index.js';

import { Logger } from '../shared/libs/logger/logger.interface.js';
import { RestConfig } from '../shared/config/rest.config.js';
import { DatabaseClient } from '../shared/libs/database-client/index.js';
import { getMongoURI } from '../shared/helpers/database.js';

import { UserModel } from '../shared/modules/user/inde.js';

@injectable()
export class RestApplication {
  constructor(
    @inject(Component.Logger) private readonly logger: Logger,
    @inject(Component.RestConfig) private readonly config: RestConfig,
    @inject(Component.DatabaseClient) private readonly databaseClient: DatabaseClient,
  ) {}

  private _initDB = async () => {
    const mongoURI = getMongoURI(
      this.config.get('DB_USER'),
      this.config.get('DB_PASSWORD'),
      this.config.get('DB_HOST'),
      this.config.get('DB_PORT'),
      this.config.get('DB_NAME'),
    );

    return this.databaseClient.connect(mongoURI);
  }

  public init = async () => {
    this.logger.info('Application initialization.');
    this.logger.info(`Get value from env $PORT: ${this.config.get('PORT')}`);

    this.logger.info('init database...');
    await this._initDB();
    this.logger.info('init database completed.');

    this.logger.info("Creating User to database.")
    const user = await UserModel.create({
      email: 'test@email.local',
      avatarPath: 'keks.jpg',
      firstname: 'Keks',
      lastname: 'Unknown'
     });
     this.logger.info("Created User to database.");
    };
}
