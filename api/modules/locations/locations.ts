import { Location } from '../../database';

const getLocations = async (req: any, res: any) => {
  try {
    const locations = await Location.findAll();
    return res.json({ success: true, code: 200, data: locations });
  } catch (err) {
    return res.json({
      success: false,
      code: 500,
      message: 'Failed to find locations',
    });
  }
};

export { getLocations };
