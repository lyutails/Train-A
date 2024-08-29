import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ArrowTopComponent } from './arrow-top.component';

describe('ArrowTopComponent', () => {
  let component: ArrowTopComponent;
  let fixture: ComponentFixture<ArrowTopComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ArrowTopComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(ArrowTopComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
