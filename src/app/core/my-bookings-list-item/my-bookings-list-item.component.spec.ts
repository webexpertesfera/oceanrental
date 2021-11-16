import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MyBookingsListItemComponent } from './my-bookings-list-item.component';

describe('MyBookingsListItemComponent', () => {
  let component: MyBookingsListItemComponent;
  let fixture: ComponentFixture<MyBookingsListItemComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MyBookingsListItemComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MyBookingsListItemComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
