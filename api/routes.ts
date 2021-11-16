import * as express from 'express';
import { bulkAvailability } from './modules/availability/availability';
import { getLocations } from './modules/locations/locations';
import {
  getAllCountries,
  getCitiesOfCountry,
} from './modules/country-state-city/country-state-city';
import {
  getWarehouses,
  getWarehouseTypes,
} from './modules/warehouses/warehouses';
import { getTransportCosts } from './modules/transport-costs/transport-costs';
import { putTransportCosts } from './modules/transport-costs/transport-costs';
import { getProductBySlug, findProducts, getRecommendedProducts } from './modules/products/products';
import { getUser, updateUser, getUsers } from './modules/user/user';
import { IsAdmin, userAuth } from './utils/authentication-middleware';

const router = express.Router();

router
  .route('/products/:product_group_slug/:product_slug')
  .get(getProductBySlug);
router.route('/products/recommended').get(getRecommendedProducts);
router.route('/products').get(findProducts);
router.route('/availability').post(bulkAvailability);
router.route('/locations').get(getLocations);
router.route('/country-state-city').get(getAllCountries);
router.route('/country-state-city/:country_code/City').get(getCitiesOfCountry);
router.route('/warehouses').get(getWarehouses);
router.route('/warehouse-types').get(getWarehouseTypes);
router.route('/transport-costs').get(userAuth, IsAdmin, getTransportCosts);
router.route('/transport-costs').put(userAuth, IsAdmin, putTransportCosts);
router.route('/users/me').get(userAuth, getUser);
router.route('/users/me').put(userAuth, updateUser);
router.route('/users').get(userAuth, IsAdmin, getUsers);

export default router;
