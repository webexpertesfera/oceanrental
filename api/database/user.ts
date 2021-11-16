import { Sequelize, Model, DataTypes } from 'sequelize';

export class User extends Model {
  public id!: string;
  public firstName?: string;
  public lastName?: string;
  public email?: string;
  public role?: string;

  public static initialize(sequelize: Sequelize) {
    User.init(
      {
        id: {
          type: DataTypes.STRING,
          primaryKey: true,
          allowNull: false,
        },
        firstName: {
          type: DataTypes.STRING,
          field: 'first_name',
        },
        lastName: {
          type: DataTypes.STRING,
          field: 'last_name',
        },
        email: {
          type: DataTypes.STRING,
          field: 'email',
        },
        role: {
          type: DataTypes.STRING,
          field: 'role',
        },
      },
      {
        sequelize,
        tableName: 'user',
        timestamps: false,
      }
    );
  }
}
