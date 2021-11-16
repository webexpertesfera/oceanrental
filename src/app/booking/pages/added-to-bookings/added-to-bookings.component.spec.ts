import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddedToBookingsComponent } from './added-to-bookings.component';

describe('AddedToBookingsComponent', () => {
  let component: AddedToBookingsComponent;
  let fixture: ComponentFixture<AddedToBookingsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddedToBookingsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddedToBookingsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
