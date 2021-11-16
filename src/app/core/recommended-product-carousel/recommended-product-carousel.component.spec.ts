import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedProductCarousel } from './recommended-product-carousel.component';

describe('SparesAndExtrasComponent', () => {
  let component: RecommendedProductCarousel;
  let fixture: ComponentFixture<RecommendedProductCarousel>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecommendedProductCarousel ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendedProductCarousel);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
