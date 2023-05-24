import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BusEjemplarComponent } from './bus-ejemplar.component';

describe('BusEjemplarComponent', () => {
  let component: BusEjemplarComponent;
  let fixture: ComponentFixture<BusEjemplarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ BusEjemplarComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(BusEjemplarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
