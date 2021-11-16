import { Warehouse, WarehouseType } from '../../database';

const getWarehouseTypes = async (req: any, res: any) => {
  try {
    const warehouseTypes = await WarehouseType.findAll();
    res.json({ success: true, data: warehouseTypes });
  } catch (err) {
    res
      .json({ success: false, message: 'Failed to fetch warehouse types' })
      .status(500);
  }
};

const getWarehouses = async (req: any, res: any) => {
  try {
    // TODO: Filter by types
    // const warehouseTypeId = req.query.warehouse_type;

    let warehouses = await Warehouse.findAll();
    res.json({ success: true, data: warehouses });
  } catch (err) {
    res
      .json({ success: false, message: 'Failed to fetch warehouse types' })
      .status(500);
  }
};

export { getWarehouseTypes, getWarehouses };
