import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DeathchartComponent } from './deathchart.component';

describe('DeathchartComponent', () => {
  let component: DeathchartComponent;
  let fixture: ComponentFixture<DeathchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DeathchartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(DeathchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
