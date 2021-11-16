import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SingleProductListItemComponent } from './single-product-list-item.component';

describe('SingleProductListItemComponent', () => {
  let component: SingleProductListItemComponent;
  let fixture: ComponentFixture<SingleProductListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SingleProductListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SingleProductListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
