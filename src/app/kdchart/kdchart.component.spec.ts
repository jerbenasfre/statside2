import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KdchartComponent } from './kdchart.component';

describe('KdchartComponent', () => {
  let component: KdchartComponent;
  let fixture: ComponentFixture<KdchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KdchartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KdchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
