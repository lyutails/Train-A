import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DupeNamePopupComponent } from './dupe-name-popup.component';

describe('DupeNamePopupComponent', () => {
  let component: DupeNamePopupComponent;
  let fixture: ComponentFixture<DupeNamePopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [DupeNamePopupComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(DupeNamePopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
