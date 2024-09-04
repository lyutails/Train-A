import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarriagesCarouselComponent } from './carriages-carousel.component';

describe('CarriagesCarouselComponent', () => {
  let component: CarriagesCarouselComponent;
  let fixture: ComponentFixture<CarriagesCarouselComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarriagesCarouselComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CarriagesCarouselComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
