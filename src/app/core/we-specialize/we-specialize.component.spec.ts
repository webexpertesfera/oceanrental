import { ComponentFixture, TestBed } from '@angular/core/testing';

import { WeSpecializeComponent } from './we-specialize.component';

describe('WeSpecializeComponent', () => {
  let component: WeSpecializeComponent;
  let fixture: ComponentFixture<WeSpecializeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ WeSpecializeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(WeSpecializeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
