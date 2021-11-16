import { LocationWarehouse } from '../../database';

const getTransportCosts = async (req: any, res: any) => {
  try {
    let where: any = {};
    if (req.query.warehouse_type_id) {
      where['warehouseTypeId'] = req.query.warehouse_type_id;
    }

    if (req.query.warehouse_id) {
      where['warehouseId'] = req.query.warehouse_id;
    }

    if (req.query.location_id) {
      where['locationId'] = req.query.location_id;
    }
    const locationWarehouses = await LocationWarehouse.findAll({
      where,
    });
    res.json({ success: true, data: locationWarehouses });
  } catch (err) {
    res.json({ success: false, message: 'Failed to fetch transport costs' });
  }
};

const putTransportCosts = async (req: any, res: any) => {
  try {
    const locationWarehouse = req.body;

    let where: any = {};
    where['warehouseTypeId'] = locationWarehouse.warehouseTypeId;
    where['warehouseId'] = locationWarehouse.warehouseId;
    where['locationId'] = locationWarehouse.locationId;

    const locationWarehouses = await LocationWarehouse.findAll({
      where,
    });
    if (locationWarehouses.length === 0) {
      return res
        .json({ success: false, message: 'Invalid location warehouse' })
        .status(500);
    }

    await LocationWarehouse.update(locationWarehouse, {
      where,
    });
    res.json({ success: true, data: locationWarehouse });
  } catch (err) {
    res.json({ success: false, message: 'Failed to fetch transport costs' });
  }
};

export { getTransportCosts, putTransportCosts };
