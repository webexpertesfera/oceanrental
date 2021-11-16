import axios from 'axios';
import * as moment from 'moment';
import * as momentTz from 'moment-timezone';
import { x } from 'ngx-bootstrap-icons';
import { Op } from 'sequelize';
import { ProductSlugIdMapCache } from '../../cache';
import {
  Location,
  LocationWarehouse,
  Warehouse,
  WarehouseType,
} from '../../database';

import { kitIds } from '../../kits';

/*
{
    products: [
        {id, quantity, accessories: []}
    ],
    location: { collection: {id}, delivery: {id} },
    period: {
        start: '',
        end: '',
    },
}
*/
const bulkAvailability = async (req: any, res: any) => {
  // TODO: Validate request body
  const availabilityRequest = req.body;

  let deliveryLocation: Location | null;
  let collectionLocation: Location | null;

  try {
    if (!availabilityRequest.location)
      throw new Error('Location required in request body');
    if (!availabilityRequest.location.delivery)
      throw new Error('Delivery Location required in request body');
    if (!availabilityRequest.location.delivery.id)
      throw new Error('Delivery Location id required in request body');

    deliveryLocation = await Location.findByPk(
      availabilityRequest.location.delivery.id
    );
    if (!deliveryLocation) {
      throw new Error('Not found');
    }
  } catch (err) {
    return res.json({
      success: false,
      message: `Invalid Delivery Location: ${err.message}`,
    });
  }

  try {
    if (!availabilityRequest.location)
      throw new Error('Location required in request body');
    if (!availabilityRequest.location.collection)
      throw new Error('Collection Location required in request body');
    if (!availabilityRequest.location.collection.id)
      throw new Error('Collection Location id required in request body');

    collectionLocation = await Location.findByPk(
      availabilityRequest.location.collection.id
    );
    if (!collectionLocation) {
      throw new Error('Not found');
    }
  } catch (err) {
    return res.json({
      success: false,
      message: `Invalid Collection Location: ${err.message}`,
    });
  }

  const locationWarehouses = await LocationWarehouse.findAll({
    where: {
      locationId: {
        [Op.in]: [deliveryLocation!.id!, collectionLocation!.id!],
      },
    },
  });

  const warehouseIds = locationWarehouses.map((lw) => lw.warehouseId!);
  const warehouses = await Warehouse.findAll({
    where: {
      id: {
        [Op.in]: warehouseIds,
      },
    },
  });

  const warehouseTypes = await WarehouseType.findAll();
  const nativeWarehouseType = warehouseTypes.find(
    (wt) => wt.abbreviation === 'N'
  );
  if (!nativeWarehouseType) {
    return res.json({
      success: false,
      message: 'Native warehouse type invalid',
    });
  }

  const alternativeWarehouseType = warehouseTypes.find(
    (wt) => wt.abbreviation === 'A'
  );
  if (!alternativeWarehouseType) {
    return res.json({
      success: false,
      message: 'Alternative warehouse type invalid',
    });
  }

  const grayWarehouseType = warehouseTypes.find(
    (wt) => wt.abbreviation === 'G'
  );
  if (!grayWarehouseType) {
    return res.json({ success: false, message: 'Gray warehouse type invalid' });
  }

  const checkWarehouseType = warehouseTypes.find(
    (wt) => wt.abbreviation === 'C'
  );
  if (!checkWarehouseType) {
    return res.json({
      success: false,
      message: 'Check warehouse type invalid',
    });
  }

  const ignoreWarehouseType = warehouseTypes.find(
    (wt) => wt.abbreviation === 'X'
  );
  if (!ignoreWarehouseType) {
    return res.json({
      success: false,
      message: 'Ignore warehouse type invalid',
    });
  }

  if (!availabilityRequest.products) {
    return res.json({
      success: false,
      message: 'Products array is required in the request body',
    });
  }

  let allStoreIds: Array<number> = [];
  const allNatives = locationWarehouses
    .filter(
      (lw) =>
        lw.locationId === deliveryLocation!.id &&
        lw.warehouseTypeId === nativeWarehouseType.id
    )
    .sort(sortByDelayInHours)
    .sort(sortByPrice);
  allNatives.forEach((n: LocationWarehouse) => {
    const wh = warehouses.find((wh: Warehouse) => wh.id === n.warehouseId);
    if (wh) {
      allStoreIds.push(wh.currentRmsStoreId!);
    }
  });

  const allAlternatives = locationWarehouses
    .filter(
      (lw) =>
        lw.locationId === deliveryLocation!.id &&
        lw.warehouseTypeId === alternativeWarehouseType.id
    )
    .sort(sortByDelayInHours)
    .sort(sortByPrice);
  allAlternatives.forEach((n: LocationWarehouse) => {
    const wh = warehouses.find((wh: Warehouse) => wh.id === n.warehouseId);
    if (wh) {
      allStoreIds.push(wh.currentRmsStoreId!);
    }
  });

  const allGrays = locationWarehouses
    .filter(
      (lw) =>
        lw.locationId === deliveryLocation!.id &&
        lw.warehouseTypeId === grayWarehouseType.id
    )
    .sort(sortByDelayInHours)
    .sort(sortByPrice);
  allGrays.forEach((n: LocationWarehouse) => {
    const wh = warehouses.find((wh: Warehouse) => wh.id === n.warehouseId);
    if (wh) {
      allStoreIds.push(wh.currentRmsStoreId!);
    }
  });

  const allChecks = locationWarehouses
    .filter(
      (lw) =>
        lw.locationId === deliveryLocation!.id &&
        lw.warehouseTypeId === checkWarehouseType.id
    )
    .sort(sortByDelayInHours)
    .sort(sortByPrice);
  allChecks.forEach((n: LocationWarehouse) => {
    const wh = warehouses.find((wh: Warehouse) => wh.id === n.warehouseId);
    if (wh) {
      allStoreIds.push(wh.currentRmsStoreId!);
    }
  });

  let queryParams = `?starts_at=${availabilityRequest.period.start}&ends_at=${availabilityRequest.period.start}`;
  allStoreIds.forEach((storeId: number) => {
    queryParams = `${queryParams}&store_id[]=${storeId}`;
  });
  queryParams = `${queryParams}&per_page=100`;
  queryParams = `${queryParams}&q[m]=or`;

  let urls: Array<string> = [];
  let newParams = '' + queryParams;
  let index = 0;
  availabilityRequest.products.forEach((p: any) => {
    const product = ProductSlugIdMapCache.get(p.id) as any;
    if (!product) {
      console.warn('Product not in cache ' + p.id);
      return;
    }

    newParams = `${newParams}&q[g][${index}][name_eq]=${product.name}`;
    index++;

    p.accessories = (product.accessories || []).filter(
      (a: any) => a.type === 'DEFAULT'
    );

    p.accessories.forEach((a: any) => {
      newParams = `${newParams}&q[g][${index}][name_eq]=${a.name}`;
      index++;
    });

    if (newParams.length > 2000) {
      urls.push(
        `https://api.current-rms.com/api/v1/product_inventories${newParams}`
      );
      index = 0;
      newParams = '' + queryParams;
    }
  });

  if (index > 0) {
    urls.push(
      `https://api.current-rms.com/api/v1/product_inventories${newParams}`
    );
    index = 0;
    newParams = '' + queryParams;
  }

  try {
    const productResponse = [...availabilityRequest.products];

    let inventory: Array<any> = [];
    for (let k = 0; k < urls.length; k++) {
      const url = urls[k];
      const result = await axios({
        url,
        headers: {
          'X-SUBDOMAIN': 'oceanpremium',
          'X-AUTH-TOKEN': 'THSBXexbhY8RUGMAwoWi',
        },
      });
      result.data.product_inventories.forEach((i: any) => {
        inventory.push(i);
      });
    }

    const now = moment().utc();
    const deliveryMoment = moment(availabilityRequest.period.start).utc();

    const durationToDelivery = moment.duration(deliveryMoment.diff(now));
    const hoursToDeliveryFromNow = durationToDelivery.asHours();

    productResponse.forEach((p: any) => {
      p.availabilityState = 'NOT_AVAILABLE';
      p.note = null;
      p.store = null;

      const inventoryItem = inventory.find((i: any) => i.id == p.id);
      if (!inventoryItem) return;

      p.price = inventoryItem.rental_price;
      p.stores = (inventoryItem.store_quantities || []).map((s: any) => {
        return {
          id: s.store_id,
          rentalQuantityAvailable: Number(s.rental_quantity_available || 0),
        };
      });

      if (kitIds.includes(Number(p.id))) {
        p.accessories.forEach((a: any) => {
          const invItem = inventory.find((i: any) => i.id === a.id);
          if (!invItem) return;

          (invItem.store_quantities || []).forEach((sq: any) => {
            const existingStore = p.stores.find(
              (ps: any) => ps.id === sq.store_id
            );
            if (existingStore) {
              existingStore.rentalQuantityAvailable =
                existingStore.rentalQuantityAvailable +
                Number(sq.rental_quantity_available || 0);

              if (existingStore.accessories) {
                existingStore.accessories[a.id] =
                  existingStore.rentalQuantityAvailable > 0 ? true : false;
              } else {
                existingStore.accessories = {};
                existingStore.accessories[a.id] =
                  existingStore.rentalQuantityAvailable > 0 ? true : false;
              }
            } else {
              const store: any = {
                id: sq.store_id,
                rentalQuantityAvailable: Number(
                  sq.rental_quantity_available || 0
                ),
              };
              store.accessories = {};
              store.accessories[a.id] =
                store.rentalQuantityAvailable > 0 ? true : false;

              p.stores.push(store);
            }
          });
        });

        p.stores = p.stores.filter((ps: any) => {
          let isValid = true;
          if (!ps.accessories) {
            return false;
          }

          Object.keys(ps.accessories).forEach((pId: any) => {
            if (ps.accessories[pId] === false) {
              isValid = false;
            }
          });

          return isValid;
        });
      }

      if (p.stores.length === 0) {
        return;
      }

      p.stores.forEach((s: any) => {
        const wh = warehouses.find((w) => w.currentRmsStoreId === s.id);
        if (!wh) {
          console.warn('Warehouse not found by CRMSID: ' + s.id);
          return;
        }

        // Lower score == better
        s.score = null;
        s.locationWarehouse = null;
        s.warehouse = null;
        s.type = null;

        const natives = locationWarehouses
          .filter(
            (lw) =>
              lw.warehouseId === wh.id &&
              lw.locationId === deliveryLocation!.id &&
              lw.warehouseTypeId === nativeWarehouseType.id
          )
          .sort(sortByDelayInHours)
          .sort(sortByPrice);

        if (natives.length > 0) {
          s.score = 0;
          s.locationWarehouse = natives[0];
          s.warehouse = wh;
          s.type = 'NATIVE';

          if (s.rentalQuantityAvailable === 0) {
            s.score = s.score + 4;
          }
          return;
        }

        const alternatives = locationWarehouses
          .filter(
            (lw) =>
              lw.warehouseId === wh.id &&
              lw.locationId === deliveryLocation!.id &&
              lw.warehouseTypeId === alternativeWarehouseType.id
          )
          .sort(sortByDelayInHours)
          .sort(sortByPrice);

        if (alternatives.length > 0) {
          s.score = 1;
          s.locationWarehouse = alternatives[0];
          s.warehouse = wh;
          s.type = 'ALTERNATIVE';

          if (s.rentalQuantityAvailable === 0) {
            s.score = s.score + 4;
          }
          return;
        }

        const grays = locationWarehouses
          .filter(
            (lw) =>
              lw.warehouseId === wh.id &&
              lw.locationId === deliveryLocation!.id &&
              lw.warehouseTypeId === grayWarehouseType.id
          )
          .sort(sortByDelayInHours)
          .sort(sortByPrice);
        if (grays.length > 0) {
          s.score = 2;
          s.locationWarehouse = grays[0];
          s.warehouse = wh;
          s.type = 'GRAY';

          if (s.rentalQuantityAvailable === 0) {
            s.score = s.score + 4;
          }
          return;
        }

        const checks = locationWarehouses
          .filter(
            (lw) =>
              lw.warehouseId === wh.id &&
              lw.locationId === deliveryLocation!.id &&
              lw.warehouseTypeId === checkWarehouseType.id
          )
          .sort(sortByDelayInHours)
          .sort(sortByPrice);
        if (checks.length > 0) {
          s.score = 3;
          s.locationWarehouse = checks[0];
          s.warehouse = wh;
          s.type = 'CHECK';

          if (s.rentalQuantityAvailable === 0) {
            s.score = s.score + 4;
          }
        }
      });

      let sortedStores = p.stores.sort((a: any, b: any) => {
        return a.score - b.score;
      });
      // .sort((a: any, b: any) => {
      //   return b.rentalQuantityAvailable - a.rentalQuantityAvailable;
      // });

      p.store = sortedStores[0];

      const note4 =
        "Unfortunately this item is not available. Don't worry! Similar items will give you as much pleasure.";

      if (!p.store.warehouse || !p.store.locationWarehouse) {
        p.availabilityState = 'NOT_AVAILABLE';
        p.note = note4;
        return;
      }

      if (p.store.rentalQuantityAvailable > 0) {
        p.availabilityState = 'AVAILABLE';
      }

      const deliverBy = now.add(
        p.store.locationWarehouse.delayInHours,
        'hours'
      );
      // console.log(
      //   'Delivery By: ',
      //   deliverBy.tz(deliveryLocation!.timezoneString!).format('DD MMM HH:mm a')
      // );
      // console.log(deliveryMoment);
      // console.log(hoursToDeliveryFromNow);
      // console.log(p.store.locationWarehouse.delayInHours);

      const note1 = `It can be delivered by ${deliverBy
        .tz(deliveryLocation!.timezoneString!)
        .format('DD MMM HH:mm a')}.`;
      const note2 =
        "You're lucky! we found Items in nearest Ocean Premium office. There might be additional delivery fee.";
      const note3 =
        'Upps, Item is available from different regional office. We can make it happen! Please call the office for Delivery fee & coordination.';

      if (hoursToDeliveryFromNow < p.store.locationWarehouse.delayInHours) {
        p.availabilityState = 'AVAILABLE_BUT_DELAYED';

        if (p.store.type === 'NATIVE') {
          p.note = note1;
        }

        if (p.store.type === 'ALTERNATIVE') {
          p.note = `${note1} ${note2}`;
        }

        if (p.store.type === 'GRAY' || p.store.type === 'CHECK') {
          if (p.store.rentalQuantityAvailable > 0) {
            p.note = note3;
          } else {
            p.availabilityState = 'NOT_AVAILABLE';
            p.note = note4;
          }
        }
      } else {
        if (p.store.type === 'NATIVE') {
          p.note = '';
        }

        if (p.store.type === 'ALTERNATIVE') {
          p.note = note2;
        }

        if (p.store.type === 'CHECK') {
          if (p.store.rentalQuantityAvailable > 0) {
            p.note = note3;
          }
        }
      }

      let watWarehouse = p.store.warehouse;
      const defaultNativeWarehouses = locationWarehouses
        .filter(
          (lw) =>
            lw.locationId === deliveryLocation!.id &&
            lw.warehouseTypeId === nativeWarehouseType.id
        )
        .sort(sortByDelayInHours)
        .sort(sortByPrice);
      if (defaultNativeWarehouses.length > 0) {
        const defaultNativeWarehouse = defaultNativeWarehouses[0];
        const nativeWarehouse = warehouses.find(
          (w: any) => w.id === defaultNativeWarehouse.warehouseId
        );
        if (nativeWarehouse) {
          watWarehouse = nativeWarehouse;
        }
      }

      if (
        now.isBefore(`${now.year()}-${watWarehouse?.activationTimeFrom}`) &&
        deliveryMoment.isAfter(
          `${now.year()}-${watWarehouse?.activationTimeFrom}`
        )
      ) {
        p.availabilityState = 'AVAILABLE';
        p.note = '';

        const found = sortedStores.filter(
          (s: any) =>
            s.locationWarehouse.warehouseTypeId !== ignoreWarehouseType.id &&
            s.rentalQuantityAvailable > 0
        );
        // console.log('WAT EXTRA: ', found);
        if (found.length === 0) {
          p.availabilityState = 'NOT_AVAILABLE';
        }
      }

      // If now is after activation warehouse time
      // and delivery is before NEXT years activation time
      // then it uses the GRAY logic

      if (
        (now.isBefore(`${now.year()}-${watWarehouse?.activationTimeFrom}`) &&
          deliveryMoment.isBefore(
            `${now.year()}-${watWarehouse?.activationTimeFrom}`
          )) ||
        (now.isAfter(`${now.year()}-${watWarehouse?.activationTimeFrom}`) &&
          deliveryMoment.isBefore(
            `${now.year() + 1}-${watWarehouse?.activationTimeFrom}`
          ))
      ) {
        if (p.store.type === 'GRAY') {
          p.availabilityState = 'AVAILABLE_BUT_DELAYED';
          p.note = note3;
        }
      }

      delete p.accessories;
    });

    return res.json({ success: true, data: productResponse });
  } catch (err) {
    console.log(err);
    return res.json({
      success: false,
      message: 'Failed to fetch availability',
    });
  }
};

const sortByDelayInHours = (a: any, b: any) =>
  parseFloat(a.delayInHours) - parseFloat(b.delayInHours);

const sortByPrice = (a: any, b: any) => {
  const aPrice =
    parseFloat(a.deliveryOnBoard) +
    parseFloat(a.handlingCosts) +
    parseFloat(a.relocationFees) +
    parseFloat(a.shippingCosts);

  const bPrice =
    parseFloat(b.deliveryOnBoard) +
    parseFloat(b.handlingCosts) +
    parseFloat(b.relocationFees) +
    parseFloat(b.shippingCosts);

  return aPrice - bPrice;
};

export { bulkAvailability };
