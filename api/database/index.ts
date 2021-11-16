import config from 'api/config';
import { Sequelize } from 'sequelize';
import * as mysql2 from 'mysql2';
import { Location } from './location';
import { LocationWarehouse } from './location-warehouse';
import { WarehouseType } from './warehouse-type';
import { Warehouse } from './warehouse';
import { User } from './user';

export class Database {
  public static initialize() {
    this._instance = new this();
  }
  public static instance(): Database {
    if (!this._instance) {
      throw new Error('Please initialize the Database class first');
    }
    return this._instance;
  }
  private static _instance: Database;

  private sequelize?: Sequelize;

  private constructor() {
    this.connect();

    Location.initialize(this.sequelize!);
    LocationWarehouse.initialize(this.sequelize!);
    WarehouseType.initialize(this.sequelize!);
    Warehouse.initialize(this.sequelize!);
    User.initialize(this.sequelize!);
  }

  private connect() {
    this.sequelize = new Sequelize(config.databaseUrl, {
      logging: false,
      dialect: 'mysql',
      dialectModule: mysql2,
    });

    this.sequelize
      .authenticate()
      .then(() => {
        console.log('Connected to ' + config.databaseUrl);
      })
      .catch((err) => {
        console.log(err);
        console.log('Failed to connect to ' + config.databaseUrl);
        process.exit(1);
      });
  }
}

export * from './location';
export * from './location-warehouse';
export * from './warehouse-type';
export * from './warehouse';
export * from './user';
