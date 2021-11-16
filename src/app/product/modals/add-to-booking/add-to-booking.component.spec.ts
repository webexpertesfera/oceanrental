import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddToBookingComponent } from './add-to-booking.component';

describe('AddToBookingComponent', () => {
  let component: AddToBookingComponent;
  let fixture: ComponentFixture<AddToBookingComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [AddToBookingComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddToBookingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
