import { Sequelize, Model, DataTypes } from 'sequelize';

export class LocationWarehouse extends Model {
  public delayInHours?: number;
  public deliveryOnBoard?: number;
  public handlingCosts?: number;
  public relocationFees?: number;
  public shippingCosts?: number;
  public warehouseId?: number;
  public locationId?: number;
  public warehouseTypeId?: number;

  public static initialize(sequelize: Sequelize) {
    LocationWarehouse.init(
      {
        delayInHours: { type: DataTypes.DECIMAL, field: 'delay_in_hours' },
        deliveryOnBoard: {
          type: DataTypes.DECIMAL,
          field: 'delivery_on_board',
        },
        handlingCosts: { type: DataTypes.DECIMAL, field: 'handling_costs' },
        relocationFees: { type: DataTypes.DECIMAL, field: 'relocation_fees' },
        shippingCosts: { type: DataTypes.DECIMAL, field: 'shipping_costs' },
        warehouseId: {
          type: DataTypes.INTEGER,
          field: 'warehouse_id',
          primaryKey: true,
        },
        locationId: {
          type: DataTypes.INTEGER,
          field: 'location_id',
          primaryKey: true,
        },
        warehouseTypeId: {
          type: DataTypes.INTEGER,
          field: 'warehouse_type_id',
          primaryKey: true,
        },
      },
      {
        sequelize,
        tableName: 'location_warehouse',
        timestamps: false,
      }
    );
  }
}
