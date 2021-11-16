import { ComponentFixture, TestBed } from '@angular/core/testing';

import { OrderFaqComponent } from './order-faq.component';

describe('OrderFaqComponent', () => {
  let component: OrderFaqComponent;
  let fixture: ComponentFixture<OrderFaqComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ OrderFaqComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(OrderFaqComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
