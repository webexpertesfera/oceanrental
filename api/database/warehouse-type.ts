import { Sequelize, Model, DataTypes } from 'sequelize';

export class WarehouseType extends Model {
  public id?: number;
  public abbreviation?: string;
  public name?: string;

  public static initialize(sequelize: Sequelize) {
    WarehouseType.init(
      {
        id: {
          type: DataTypes.INTEGER,
          primaryKey: true,
          allowNull: false,
          autoIncrement: true,
        },
        abbreviation: {
          type: DataTypes.STRING,
        },
        name: {
          type: DataTypes.STRING,
        },
      },
      {
        sequelize,
        tableName: 'warehouse_type',
        timestamps: false,
      }
    );
  }
}
