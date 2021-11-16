import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TransportCostsComponent } from './transport-costs.component';

describe('TransportCostsComponent', () => {
  let component: TransportCostsComponent;
  let fixture: ComponentFixture<TransportCostsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TransportCostsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TransportCostsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
