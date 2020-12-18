import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlaytimechartComponent } from './playtimechart.component';

describe('PlaytimechartComponent', () => {
  let component: PlaytimechartComponent;
  let fixture: ComponentFixture<PlaytimechartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlaytimechartComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(PlaytimechartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
