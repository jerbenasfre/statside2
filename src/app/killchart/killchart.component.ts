import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'node_modules/chart.js';

@Component({
  selector: 'app-killchart',
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
export class KillchartComponent implements OnInit {
  // kill_map can either be time/faction map or class kill map
  @Input() kill_map: Map<string, Array<number>>;
  @Input() kill_type: string;// var to determine how to label chart
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

  // Referenced https://tobiasahlin.com/blog/chartjs-charts-to-get-you-started/#2-line-chart https://www.chartjs.org/
  // Used to display data related to kills
  ngOnInit(): void {
    // If overall view, get data in terms of faction of enemy kill and from what time period (this.index)
    this.labels = ['VS','NC','TR'];

    if (this.kill_type == 'overall')
      this.data = this.kill_map.get('all time');

    else if (this.kill_type == 'classview') {
      this.data = [0,0,0,0,0,0];
      this.labels = ['Infiltrator', 'Light Assault', 'Medic','Engineer','Heavy Assault','Max'];

      this.data[0] += this.kill_map.get('infiltrator')
      this.data[1] += this.kill_map.get('light assault');
      this.data[2] += this.kill_map.get('medic');
      this.data[3] += this.kill_map.get('engineer');
      this.data[4] += this.kill_map.get('heavy assault');
      this.data[5] += this.kill_map.get('max');
    }
    else if (this.kill_type == 'vehicleview'){
      this.labels = ['Flash','Sunderer','Lightning','Magrider','Vanguard','Prowler',
      'Scythe','Reaver','Mosquito','Liberator','Galaxy','Harraser','Valkyrie',
      'Ant','Colossus','Bastion','Javelin'];
      this.data = [
        this.kill_map.get('flash'),
        this.kill_map.get('sunderer'),
        this.kill_map.get('lightning'),
        this.kill_map.get('magrider'),
        this.kill_map.get('vanguard'),
        this.kill_map.get('prowler'),
        this.kill_map.get('scythe'),
        this.kill_map.get('reaver'),
        this.kill_map.get('mosquito'),
        this.kill_map.get('liberator'),
        this.kill_map.get('galaxy'),
        this.kill_map.get('harasser'),
        this.kill_map.get('valkyrie'),
        this.kill_map.get('ant'),
        this.kill_map.get('colossus'),
        this.kill_map.get('bastion'),
        this.kill_map.get('javelin')];
    }

    this.colors = [
      'rgba(215, 86, 245, 0.8)',
      'rgba(54, 162, 235, 0.8)',
      'rgba(255, 99, 132, 0.8)',
      'rgba(75, 100, 192, 0.8)',
      'rgba(153, 102, 255, 0.8)',
      'rgba(255, 159, 64, 0.8)',
      'rgba(255, 255, 255, 0.8)',
      'rgba(0, 0, 0, 0.8)',
      'rgba(100, 100, 0, 0.8)',
      'rgba(100, 0, 100, 0.8)',
      'rgba(50, 50, 50, 0.8)',
      'rgba(200, 200, 200, 0.8)',
      'rgba(0, 0, 255, 0.8)',
      'rgba(255, 0, 0, 0.8)',
      'rgba(0, 255, 0, 0.8)',
      'rgba(0, 50, 0, 0.8)',
      'rgba(50, 0, 0, 0.8)'
    ];
  }

  radioChange(event){
    if (event.value == 'all time')
      this.data = this.kill_map.get('all time');
    if (event.value == 'monthly')
      this.data = this.kill_map.get('monthly');
    else if(event.value == 'weekly')
      this.data = this.kill_map.get('weekly');
    else if(event.value == 'daily')
      this.data = this.kill_map.get('daily');

    this.labels = ['VS','NC','TR'];
  }
}
