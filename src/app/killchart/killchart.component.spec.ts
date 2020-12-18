import { ComponentFixture, TestBed } from '@angular/core/testing';

import { KillchartComponent } from './killchart.component';

describe('KillchartComponent', () => {
  let component: KillchartComponent;
  let fixture: ComponentFixture<KillchartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ KillchartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(KillchartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
