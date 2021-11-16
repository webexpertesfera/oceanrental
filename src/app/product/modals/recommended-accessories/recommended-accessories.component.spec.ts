import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RecommendedAccessoriesComponent } from './recommended-accessories.component';

describe('RecommendedAccessoriesComponent', () => {
  let component: RecommendedAccessoriesComponent;
  let fixture: ComponentFixture<RecommendedAccessoriesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [RecommendedAccessoriesComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RecommendedAccessoriesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
