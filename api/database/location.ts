import { Sequelize, Model, DataTypes } from 'sequelize';

export class Location extends Model {
  public id?: number;
  public cityArea?: string;
  public cruisingArea?: string;
  public name?: string;
  public timezone?: string;
  public timezoneString?: string;

  public static initialize(sequelize: Sequelize) {
    Location.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        cityArea: { type: DataTypes.STRING, field: 'city_area' },
        cruisingArea: { type: DataTypes.STRING, field: 'cruising_area' },
        name: { type: DataTypes.STRING },
        timezone: { type: DataTypes.STRING },
        timezoneString: { type: DataTypes.STRING, field: 'timezone_string' },
      },
      {
        sequelize,
        tableName: 'location',
        timestamps: false,
      }
    );
  }
}
