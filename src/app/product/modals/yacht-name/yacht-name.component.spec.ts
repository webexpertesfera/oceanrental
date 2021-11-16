import { ComponentFixture, TestBed } from '@angular/core/testing';

import { YachtNameComponent } from './yacht-name.component';

describe('YachtNameComponent', () => {
  let component: YachtNameComponent;
  let fixture: ComponentFixture<YachtNameComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ YachtNameComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(YachtNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
