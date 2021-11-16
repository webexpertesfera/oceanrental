import axios from 'axios';
import slugify from 'slugify';
import * as fs from 'fs';

import { ProductSlugIdMapCache } from '../api/cache';

const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

const ignoreMap: { [productId: number]: boolean } = {};

export default async () => {
  try {
    let rawdata = fs.readFileSync('./product-cache.json', 'utf-8') || '{}';
    let products = JSON.parse(rawdata);

    Object.keys(products).forEach((productKey: any) => {
      const product = products[productKey];
      if (isNaN(productKey)) {
        ProductSlugIdMapCache.put(productKey, product);
      } else {
        ProductSlugIdMapCache.put(Number(productKey), product);
      }
      // console.log(`File save ${product.name} (${productKey})`);
    });
  } catch (err) {
    console.log(err);
  }

  const baseUrl =
    'https://zu6wjlgc49.execute-api.eu-west-1.amazonaws.com/staging/api/v1/products';
  const numberOfProducts = 21;

  for (let productId = 20; productId < numberOfProducts; productId++) {
    try {
      if (ignoreMap[productId]) continue;

      if (ProductSlugIdMapCache.get(productId)) continue;

      const response = await axios.get(`${baseUrl}/${productId}`);

      const product = response.data.data;

      const productGroupSlug = slugify(
        `${product.productGroupSlug || 'group'}`,
        {
          lower: true,
        }
      );

      let productSlug = slugify(
        `${product.productSlug || product.name + ' Rental'}`,
        { lower: true }
      );
      product.slug = productSlug;

      ProductSlugIdMapCache.put(`${productGroupSlug}/${productSlug}`, product);
      ProductSlugIdMapCache.put(productId, product);
      // console.log(`Saved ${product.name} (${productGroupSlug}/${productSlug})`);

      await sleep(10000);
    } catch (err) {
      console.log(`Failed to fetch product ID: ${productId}, ${err}`);
      if (err.response.status == 404) {
        ignoreMap[productId] = true;
      }
    }
  }

  const cache: any = {};
  ProductSlugIdMapCache.keys().forEach((key: any) => {
    cache[key] = ProductSlugIdMapCache.get(key);
  });
  fs.writeFileSync('./product-cache.json', JSON.stringify(cache));
};
