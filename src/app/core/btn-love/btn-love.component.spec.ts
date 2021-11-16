import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BtnLoveComponent } from './btn-love.component';

describe('BtnLoveComponent', () => {
  let component: BtnLoveComponent;
  let fixture: ComponentFixture<BtnLoveComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BtnLoveComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BtnLoveComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
