import axios from 'axios';
import Fuse from 'fuse.js';
import { ProductSlugIdMapCache } from '../../cache';

const getProductBySlug = (req: any, res: any) => {
  const cacheKey = `${req.params.product_group_slug}/${req.params.product_slug}`;

  const product = ProductSlugIdMapCache.get(cacheKey);
  if (!product) return res.status(404).end();

  return res.json(product);
};

const getRecommendedProducts = async (req: any, res: any) => {
  const search = req.query.search || '';
  const productGroupId = req.query.product_group_ids;

  let params = `?q[product_tags_name_cont]=${search}`;

  if (productGroupId) { // We pass in from our frontend ..&product_group_ids=4,3,5,25
    const productGroups = productGroupId.split(","); // This will turn it into an array
    productGroups.forEach((pg: any) => {
      params = `${params}&q[product_group_id_in][]=${pg}`;
    });
  }

  let products: Array<string> = [];

  if (params.length > 0) {
    let url = `https://api.current-rms.com/api/v1/products${params}`;
    const result = await axios({
      url,
      headers: {
        'X-SUBDOMAIN': 'oceanpremium',
        'X-AUTH-TOKEN': 'THSBXexbhY8RUGMAwoWi',
      },
    });
    // console.log('Res on products call: ', result.data);
    result.data.products.forEach((i: any) => {
      products.push(i);
    });
  }

  return res.json({ success: true, data: products });
};

const findProducts = async (req: any, res: any) => {
  const search = req.query.search || '';
  const deliveryLocationId = req.query.delivery_location_id;
  const collectionLocationId = req.query.collection_location_id;
  const startsAt = req.query.starts_at;
  const endsAt = req.query.ends_at;
  const productGroupId = req.query.product_group_ids;

  let inventory: Array<any> = [];
  let params = `?q[product_tags_name_cont]=${search}`;
  if (deliveryLocationId) {
    params = `${params}&delivery_location_id=${deliveryLocationId}`;
  }

  if (collectionLocationId) {
    params = `${params}&collection_location_id=${collectionLocationId}`;
  }

  if (startsAt) {
    params = `${params}&starts_at=${startsAt}`;
  }

  if (endsAt) {
    params = `${params}&ends_at=${endsAt}`;
  }

  if (productGroupId) { // We pass in from our frontend ..&product_group_ids=4,3,5,25
    const productGroups = productGroupId.split(","); // This will turn it into an array
    productGroups.forEach((pg: any) => {
      params = `${params}&q[product_group_id_in][]=${pg}`;
    });
  }

  try {
    const res = await axios({
      method: 'GET',
      url: `https://zu6wjlgc49.execute-api.eu-west-1.amazonaws.com/staging/api/v1/products/inventory${params}`,
    });
    if (res.status === 200) {
      inventory = res.data.data;
    }
  } catch (err) {
    return res
      .json({
        success: false,
        message: 'Failed to fetch inventory.',
        data: [],
      })
      .status(200);
  }

  try {
    const products = ProductSlugIdMapCache.keys().map((key) =>
      ProductSlugIdMapCache.get(key)
    );
    const fuse = new Fuse(products, {
      keys: ['name', 'seoFriendlyName', 'seoMetaDescription'],
    });
    const data = req.query.search
      ? fuse.search(req.query.search)
      : products.map((p) => {
        return {
          item: p,
        };
      });

    const kitIds = [
      87,
      98,
      122,
      125,
      126,
      127,
      131,
      132,
      133,
      134,
      135,
      137,
      208,
      209,
      270,
      314,
      315,
      316,
      317,
      324,
      325,
      326,
      327,
    ];

    let availableProducts: Array<any> = [];
    data.forEach((fuzzyP: any) => {
      if (kitIds.includes(fuzzyP.item.id)) {
        availableProducts.push(fuzzyP.item);
        return;
      }

      const available = inventory.find((i) => i.id === fuzzyP.item.id);
      if (available) {
        availableProducts.push(fuzzyP.item);
      }
    });

    return res.json({ success: true, message: null, data: availableProducts });
  } catch (err) {
    return res
      .json({ success: false, message: 'Failed to search products.', data: [] })
      .status(500);
  }
};

export { getProductBySlug, getRecommendedProducts, findProducts };
