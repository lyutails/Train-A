import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RidePriceFormComponent } from './ride-price-form.component';

describe('RidePriceFormComponent', () => {
  let component: RidePriceFormComponent;
  let fixture: ComponentFixture<RidePriceFormComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RidePriceFormComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(RidePriceFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
