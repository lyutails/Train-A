import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeRideComponent } from './home-ride.component';

describe('HomeRideComponent', () => {
  let component: HomeRideComponent;
  let fixture: ComponentFixture<HomeRideComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HomeRideComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(HomeRideComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
