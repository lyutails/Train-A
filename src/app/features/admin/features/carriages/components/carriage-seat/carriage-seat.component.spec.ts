import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarriageSeatComponent } from './carriage-seat.component';

describe('CarriageSeatComponent', () => {
  let component: CarriageSeatComponent;
  let fixture: ComponentFixture<CarriageSeatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarriageSeatComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CarriageSeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
