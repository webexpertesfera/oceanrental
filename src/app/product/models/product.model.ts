import { Attachment } from 'src/app/core/models/attachment.model';
import { FAQ } from 'src/app/core/models/faqs.model';
import { Image } from 'src/app/core/models/image.model';
import { ProductDescription } from './product-description.model';
import { ProductGroup } from './product-group.model';

export class Product {
  id?: number;
  slug?: string;
  name?: string;
  summary?: string;
  overview?: string;
  tagline?: string;
  description?: ProductDescription;
  price?: number;
  totalPrice?: number;
  imageThumbnail?: Image;
  icon?: Image;
  productGroup?: ProductGroup;
  seoFriendlyName?: string;
  seoMetaDescription?: string;
  productGroupSlug?: string;
  productSlug?: string;

  accessories: Array<Product> = [];
  images?: Array<Image> = [];
  attachments?: Array<Attachment> = [];
  rates?: Array<any> = [];
  note?: string;

  availabilityState: string = '';
  features: string = '';
  faqs: Array<FAQ> = [];

  isAvailable?: boolean = false;
  addedToBooking?: boolean = false;
  quantity: number = 1;
  type: string = 'Product';
}
