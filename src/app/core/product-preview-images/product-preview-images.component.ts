import { Component, Input, OnInit } from '@angular/core';
import { Product } from 'src/app/product/models/product.model';

@Component({
  selector: 'app-product-preview-images',
  templateUrl: './product-preview-images.component.html',
  styleUrls: ['./product-preview-images.component.scss'],
})
export class ProductPreviewImages implements OnInit {
  @Input() products: Array<Product> = [];

  constructor() {}

  ngOnInit(): void {}
}
