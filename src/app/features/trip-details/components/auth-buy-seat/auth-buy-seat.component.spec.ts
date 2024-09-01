import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AuthBuySeatComponent } from './auth-buy-seat.component';

describe('AuthBuySeatComponent', () => {
  let component: AuthBuySeatComponent;
  let fixture: ComponentFixture<AuthBuySeatComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AuthBuySeatComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthBuySeatComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
