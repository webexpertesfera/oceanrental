import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DropOffLocationComponent } from './drop-off-location.component';

describe('DropOffLocationComponent', () => {
  let component: DropOffLocationComponent;
  let fixture: ComponentFixture<DropOffLocationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [DropOffLocationComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DropOffLocationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
