import { APP_BASE_HREF } from '@angular/common';
import { Inject, Injectable } from '@angular/core';
import { FAQ } from 'src/app/core/models/faqs.model';
import { HttpService } from 'src/app/core/services/http.service';
import { environment } from 'src/environments/environment';
import { Product } from '../models/product.model';

@Injectable({
  providedIn: 'root',
})
export class ProductService {
  private baseUrl =
    'https://zu6wjlgc49.execute-api.eu-west-1.amazonaws.com/staging/api/v1/products';

  constructor(
    @Inject(APP_BASE_HREF) public baseHref: string,
    private httpService: HttpService
  ) { }

  async getAllProducts() {
    try {
      const response = await this.httpService.get(`${environment.apiBaseUrl}/products`);
      return response.data;
    } catch (err) {
      console.log(err);
      throw new Error('Failed to get products');
    }
  }

  async getProductById(
    id: number | string
  ): Promise<{ product: Product; accessories: Array<Product> }> {
    try {
      const response = await this.httpService.get(
        `${this.baseUrl}/${id}`
      );
      const data = response.data;

      const product = new Product();
      product.id = data.id;
      product.slug = data.seoFriendlyName || data.slug || data.name;
      product.name = data.name;
      product.tagline = data.tagline;
      product.description = data.description;
      product.imageThumbnail = data.imageThumbnail;
      product.images = data.images;
      product.attachments = data.attachments;
      product.productGroup = data.productGroup;
      product.isAvailable = true;
      product.rates = data.rates;
      product.type = data.type;
      product.features = data.features;
      product.seoFriendlyName = data.seoFriendlyName;
      product.seoMetaDescription = data.seoMetaDescription;
      product.productGroupSlug = data.productGroupSlug;
      product.productSlug = data.productSlug;

      product.faqs = [];
      if (data.faqs) {
        const paragraphs = 11;
        for (let k = 1; k < paragraphs; k++) {
          if (data.faqs[`paragraph${k}`]) {
            product.faqs.push({
              id: k + '',
              question: data.faqs[`paragraph${k}`].head,
              content: data.faqs[`paragraph${k}`].paragraph,
            });
          }
        }
      }

      const rate = data.rates.find((r: any) => r.chargePeriod === 'Daily');
      if (!rate) {
        product.price = 0;
      } else {
        product.price = Number(rate.price);
      }

      const accessories = data.accessories.map((a: any) => {
        const rate = a.rates.find((r: any) => r.chargePeriod === 'Daily');
        let price = 0;
        if (rate) {
          price = Number(rate.price);
        }

        if (a.images && a.images.length > 0) {
          a.imageThumbnail = a.images[0];
        }

        return {
          ...a,
          price,
        } as Product;
      });

      return { product, accessories };
    } catch (err) {
      console.log(err);
      throw new Error('Failed to get product');
    }
  }

  async getProductBySlug(
    productGroupSlug: string,
    productSlug: string
  ): Promise<{ product: Product; accessories: Array<Product> }> {
    try {
      const data = await this.httpService.get(
        `${environment.apiBaseUrl}/products/${productGroupSlug}/${productSlug}`
      );

      const product = new Product();
      product.id = data.id;
      product.slug = data.seoFriendlyName || data.slug || data.name;
      product.name = data.name;
      product.tagline = data.tagline;
      product.description = data.description;
      product.imageThumbnail = data.imageThumbnail;
      product.images = data.images;
      product.attachments = data.attachments;
      product.productGroup = data.productGroup;
      product.isAvailable = true;
      product.rates = data.rates;
      product.type = data.type;
      product.features = data.features;
      product.seoFriendlyName = data.seoFriendlyName;
      product.seoMetaDescription = data.seoMetaDescription;
      product.productGroupSlug = data.productGroupSlug;
      product.productSlug = data.productSlug;

      product.faqs = [];
      if (data.faqs) {
        const paragraphs = 11;
        for (let k = 1; k < paragraphs; k++) {
          if (data.faqs[`paragraph${k}`]) {
            product.faqs.push({
              id: k + '',
              question: data.faqs[`paragraph${k}`].head,
              content: data.faqs[`paragraph${k}`].paragraph,
            });
          }
        }
      }

      const rate = data.rates.find((r: any) => r.chargePeriod === 'Daily');
      if (!rate) {
        product.price = 0;
      } else {
        product.price = Number(rate.price);
      }

      const accessories = data.accessories.map((a: any) => {
        const rate = a.rates.find((r: any) => r.chargePeriod === 'Daily');
        let price = 0;
        if (rate) {
          price = Number(rate.price);
        }

        if (a.images && a.images.length > 0) {
          a.imageThumbnail = a.images[0];
        }

        return {
          ...a,
          price,
        } as Product;
      });

      return { product, accessories };
    } catch (err) {
      console.log(err);
      throw new Error('Failed to get product');
    }
  }

  async getRecommendedProducts(
    productGroupIds: Array<number>
  ): Promise<Array<Product>> {
    if (productGroupIds.length === 0)
      throw new Error('Product group IDs required');

    const response = await this.httpService.get(
      `${this.baseUrl
      }/groups?q[recommended_by_product_group_ids_in]=${productGroupIds.join(
        ','
      )}`
    );
    if (!response.data) {
      throw new Error('No recommended products');
    }

    return response.data.map((p: any) => {
      const product = new Product();
      product.id = p.id;
      product.slug = p.slug;
      product.name = p.name;
      product.summary =
        'The most fun you can have on the Water! \nUp to 65 km/h of thrilling wave hopping!';
      product.overview =
        'This watercraft is one of the easiest ways to get into the musclecraft scene. It comes with a powerful supercharged 230-hp Rotax engine and it is now equipped with the exclusive LinQ Quick-Attach System for cargo and the Bluetooth Audio System.';
      product.description = p.description;
      product.tagline = p.tagline;
      product.imageThumbnail = p.imageThumbnail;
      product.images = p.images;
      product.attachments = p.attachments;
      product.productGroup = p.productGroup;
      product.price = 400;
      product.isAvailable = true;
      return product;
    });
  }

  async getRecommendedWaterToysToRent(
    productGroupIds: Array<number>,
    search?: any,
    deliveryLocationId?: any,
    collectionLocationId?: any,
    startsAt?: any,
    endsAt?: any,
  ): Promise<Array<Product>> {

    let queryParams = '';

    if (search) {
      queryParams = `${queryParams}search=${search}`;
    }

    if (deliveryLocationId) {
      if (queryParams) {
        queryParams = `${queryParams}&delivery_location_id=${deliveryLocationId}`;
      } else {
        queryParams = `${queryParams}delivery_location_id=${deliveryLocationId}`;
      }
    }

    if (collectionLocationId) {
      if (queryParams) {
        queryParams = `${queryParams}&collection_location_id=${collectionLocationId}`;
      } else {
        queryParams = `${queryParams}collection_location_id=${collectionLocationId}`;
      }
    }

    if (startsAt) {
      if (queryParams) {
        queryParams = `${queryParams}&starts_at=${startsAt}`;
      } else {
        queryParams = `${queryParams}starts_at=${startsAt}`;
      }
    }

    if (endsAt) {
      if (queryParams) {
        queryParams = `${queryParams}&ends_at=${endsAt}`;
      } else {
        queryParams = `${queryParams}ends_at=${endsAt}`;
      }
    }

    if (productGroupIds.length === 0) {
      throw new Error('Product group IDs required');
    } else {
      if (queryParams) {
        queryParams = `${queryParams}&product_group_ids=${productGroupIds}`;
      } else {
        queryParams = `${queryParams}product_group_ids=${productGroupIds}`;
      }
    }

    const response = await this.httpService.get(
      `${environment.apiBaseUrl}/products?${queryParams}`
    );

    if (!response.data) {
      throw new Error('Water Toys not found');
    } else {
      response.data.forEach((product: any) => {
        const rate = product.rates.find((r: any) => r.storeId === 1);
        if (rate) {
          product.price = Number(rate.price);
        }
      });
    }
    return response.data;
  }


  async getRecommendedWaterToys(
    productGroupIds: Array<number>,
  ): Promise<Array<Product>> {

    let queryParams = '';

    if (productGroupIds.length === 0) {
      throw new Error('Product group IDs required');
    } else {
      if (queryParams) {
        queryParams = `${queryParams}&product_group_ids=${productGroupIds}`;
      } else {
        queryParams = `${queryParams}product_group_ids=${productGroupIds}`;
      }
    }

    const response = await this.httpService.get(
      `${environment.apiBaseUrl}/products/recommended?${queryParams}`
    );

    if (!response.data) {
      throw new Error('Water Toys not found');
    } else {
      response.data.forEach((product: any) => {
        const rate = product.rental_rate;
        if (rate) {
          product.price = Number(rate.price);
        }
      });
    }
    return response.data;
  }
}
