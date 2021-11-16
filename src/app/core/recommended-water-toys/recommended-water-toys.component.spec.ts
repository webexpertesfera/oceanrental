import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedWaterToysComponent } from './recommended-water-toys.component';

describe('RecommendedWaterToysComponent', () => {
  let component: RecommendedWaterToysComponent;
  let fixture: ComponentFixture<RecommendedWaterToysComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ RecommendedWaterToysComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendedWaterToysComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
