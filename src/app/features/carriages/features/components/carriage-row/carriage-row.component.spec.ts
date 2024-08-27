import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CarriageRowComponent } from './carriage-row.component';

describe('CarriageRowComponent', () => {
  let component: CarriageRowComponent;
  let fixture: ComponentFixture<CarriageRowComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CarriageRowComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(CarriageRowComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
