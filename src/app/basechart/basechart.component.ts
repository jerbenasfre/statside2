import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'node_modules/chart.js';

@Component({
  selector: 'app-basechart',
  template: `
  <div *ngIf='index != null'>
    <br>
    <label id="playtimeTimeFrame">Select Time Frame</label>
    <br>
    <mat-radio-group
      aria-labelledby="playtimeTimeFrame"
      [(ngModel)]="timeSelected">
      <mat-radio-button *ngFor="let time of times" [value]="time" (change)="radioChange($event)">
        {{time}}
      </mat-radio-button>
    </mat-radio-group>
  </div>

  <app-piechart *ngIf='data' [data]='data' [labels]='labels' [colors]='colors' [pieChartId]='chartId' [displayLegend]='displayLegend'></app-piechart>`
})
export class BasechartComponent implements OnInit {
  // Base capture and base defense data.
  // value are Array<number>
  @Input() base_capture: Map<string, Array<number>>;
  @Input() base_defense: Map<string, Array<number>>;

  @Input() index: number;// Determines which data to get from map.
                        // 0 for all time, 1 for monthly, 2 for weekly, etc
  @Input() chartId: string;//Workaround to let me resuse component multiple times

  data = [];
  labels = [];
  colors = [];
  displayLegend = true;

  timeSelected: string = 'monthly';
  times: string[] = ['monthly', 'weekly', 'daily'];

  constructor() { }

  // used to display capture/defense ratio
  ngOnInit(): void {
    let capture_data = 0;
    let defense_data = 0;

    if(this.timeSelected == 'monthly'){
      var date = new Date();
      var month = date.getMonth();

      capture_data += this.base_capture.get('monthly')[month];
      defense_data += this.base_defense.get('monthly')[month];
    }
    // The last index of weekly/daily is the most recently saved data
    else {
      capture_data += this.base_capture.get(this.timeSelected)[this.base_capture
        .get(this.timeSelected).length-1];
      defense_data += this.base_defense.get(this.timeSelected)[this.base_defense
        .get(this.timeSelected).length-1];
    }

    this.data = [capture_data, defense_data];
    this.labels = ['Capture','Defense'];
    this.colors = ['#c45850','#3cba9f'];
  }


  radioChange(event){
    this.timeSelected = event.value;
    let capture_data = 0;
    let defense_data = 0;

    if(this.timeSelected == 'monthly'){
      var date = new Date();
      var month = date.getMonth();

      capture_data += this.base_capture.get('monthly')[month];
      defense_data += this.base_defense.get('monthly')[month];
    }
    // The last index of weekly/daily is the most recently saved data
    else {
      capture_data += this.base_capture.get(this.timeSelected)[this.base_capture
        .get(this.timeSelected).length-1];
      defense_data += this.base_defense.get(this.timeSelected)[this.base_defense
        .get(this.timeSelected).length-1];
    }

    this.data = [capture_data, defense_data];
    this.labels = ['Capture','Defense'];
    this.colors = ['#c45850','#3cba9f'];
  }
}
