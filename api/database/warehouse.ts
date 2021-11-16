import { Sequelize, Model, DataTypes } from 'sequelize';

export class Warehouse extends Model {
  public id?: number;
  public activationTimeFrom?: string;
  public activationTimeTo?: string;
  public closingHour?: string;
  public openingHour?: string;
  public currentRmsStoreId?: number;
  public name?: string;
  public timezone?: string;
  public timezoneString?: string;

  public static initialize(sequelize: Sequelize) {
    Warehouse.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        activationTimeFrom: {
          type: DataTypes.STRING,
          field: 'activation_time_from',
        },
        activationTimeTo: {
          type: DataTypes.STRING,
          field: 'activation_time_to',
        },
        closingHour: { type: DataTypes.STRING, field: 'closing_hour' },
        currentRmsStoreId: {
          type: DataTypes.INTEGER,
          field: 'current_rms_store_id',
        },
        name: { type: DataTypes.STRING },
        openingHour: { type: DataTypes.STRING, field: 'opening_hour' },
        timezone: { type: DataTypes.STRING },
        timezone_string: { type: DataTypes.STRING, field: 'timezone_string' },
      },
      {
        sequelize,
        tableName: 'warehouse',
        timestamps: false,
      }
    );
  }
}
