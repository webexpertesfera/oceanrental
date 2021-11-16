import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PaymentLandingComponent } from './payment-landing.component';

describe('PaymentLandingComponent', () => {
  let component: PaymentLandingComponent;
  let fixture: ComponentFixture<PaymentLandingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PaymentLandingComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PaymentLandingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
