import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ProductPreviewImages } from './product-preview-images.component';

describe('ThreeBookingImagesComponent', () => {
  let component: ProductPreviewImages;
  let fixture: ComponentFixture<ProductPreviewImages>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductPreviewImages ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPreviewImages);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
