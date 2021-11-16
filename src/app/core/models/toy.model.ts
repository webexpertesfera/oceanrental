import { Image } from 'src/app/core/models/image.model';
import { ProductDescription } from 'src/app/product/models/product-description.model';

export class Toy {
    id?: number;
    slug?: string;
    name?: string;
    summary?: string;
    description?: ProductDescription;
    price?: number;
    imageThumbnail?: Image;
}
