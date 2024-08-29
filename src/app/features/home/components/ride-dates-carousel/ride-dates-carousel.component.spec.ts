import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RideDatesCarouselComponent } from './ride-dates-carousel.component';

describe('RideDatesCarouselComponent', () => {
  let component: RideDatesCarouselComponent;
  let fixture: ComponentFixture<RideDatesCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RideDatesCarouselComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RideDatesCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
