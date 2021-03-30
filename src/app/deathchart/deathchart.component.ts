import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'node_modules/chart.js';

@Component({
  selector: 'app-deathchart',
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
export class DeathchartComponent implements OnInit {
  // death_map can either be time/faction map or class death map
  @Input() death_map: Map<string, Array<number>>;
  @Input() death_type: string;// var to determine how to label chart
  @Input() index: number;// Determines which data to get from map.
                        // 0 for all time, 1 for monthly, 2 for weekly, etc
  @Input() chartId: string;//Workaround to let me resuse component multiple times

  data = [];
  labels = [];
  colors = [];
  displayLegend = true;

  timeSelected: string = 'all time';
  times: string[] = ['all time', 'monthly', 'weekly', 'daily'];

  constructor() { }

  ngOnInit(): void {
    // if general view,
    //  just show factions
    //  and get data according to chosen timeframe (this.index)
    if(this.death_type == 'overall'){
      this.labels = ['VS','NC','TR'];
      this.data = this.death_map.get('all time');
    }
    // Other wise display data in terms of classes
    else{
      this.data = [0,0,0,0,0,0];
      this.labels = ['Infiltrator', 'Light Assault', 'Medic','Engineer','Heavy Assault','Max'];

      this.data[0] += this.death_map.get('infiltrator')
      this.data[1] += this.death_map.get('light assault');
      this.data[2] += this.death_map.get('medic');
      this.data[3] += this.death_map.get('engineer');
      this.data[4] += this.death_map.get('heavy assault');
      this.data[5] += this.death_map.get('max');
    }

    this.colors = ['rgba(150, 0, 150, 0.8)',
    'rgba(0, 0, 255, 0.8)',
    'rgba(200, 0, 0, 0.8)',
    'rgba(75, 100, 192, 0.8)',
    'rgba(153, 102, 255, 0.8)',
    'rgba(255, 159, 64, 0.8)'];
  }

  radioChange(event){
    if (event.value == 'all time')
      this.data = this.death_map.get('all time');
    if (event.value == 'monthly')
      this.data = this.death_map.get('monthly');
    else if(event.value == 'weekly')
      this.data = this.death_map.get('weekly');
    else if(event.value == 'daily')
      this.data = this.death_map.get('daily');

    this.labels = ['VS','NC','TR'];
  }
}
