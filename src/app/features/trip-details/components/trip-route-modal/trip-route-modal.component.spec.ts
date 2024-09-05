import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TripRouteModalComponent } from './trip-route-modal.component';

describe('TripRouteModalComponent', () => {
  let component: TripRouteModalComponent;
  let fixture: ComponentFixture<TripRouteModalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TripRouteModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(TripRouteModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
