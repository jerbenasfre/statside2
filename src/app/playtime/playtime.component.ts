import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'node_modules/chart.js';

@Component({
  selector: 'app-playtime',
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
export class PlaytimeComponent implements OnInit {

  @Input() playtime: Map<string, Array<number>>;// class playtime data passed from app.component
  @Input() data_type: string;// determines if infantry or vehicle playtime
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
    let index = 0;

    // Set up data for infantry playtime
    if(this.data_type === 'infantry'){
      this.data = [0,0,0,0,0,0]; // Initialize playtime of all classes to 0
      this.labels = ['Infiltrator', 'Light Assault', 'Medic','Engineer','Heavy Assault','Max'];

      // Gets forever, monthly, etc depending on val of index
      this.data[0] += this.playtime.get('infiltrator')[index];
      this.data[1] += this.playtime.get('light assault')[index];
      this.data[2] += this.playtime.get('medic')[index];
      this.data[3] += this.playtime.get('engineer')[index];
      this.data[4] += this.playtime.get('heavy assault')[index];
      this.data[5] += this.playtime.get('max')[index];
    }
    // Set up data for vehicle playtime of all time
    else{
      this.labels = ['Flash','Sunderer','Lightning','Magrider','Vanguard','Prowler',
      'Scythe','Reaver','Mosquito','Liberator','Galaxy','Harraser','Valkyrie',
      'Ant','Colossus','Bastion','Javelin'];
      this.data = [
        this.playtime.get('flash'),
        this.playtime.get('sunderer'),
        this.playtime.get('lightning'),
        this.playtime.get('magrider'),
        this.playtime.get('vanguard'),
        this.playtime.get('prowler'),
        this.playtime.get('scythe'),
        this.playtime.get('reaver'),
        this.playtime.get('mosquito'),
        this.playtime.get('liberator'),
        this.playtime.get('galaxy'),
        this.playtime.get('harasser'),
        this.playtime.get('valkyrie'),
        this.playtime.get('ant'),
        this.playtime.get('colossus'),
        this.playtime.get('bastion'),
        this.playtime.get('javelin')
      ];

      //this.displayLegend = false;
    }

    this.colors = [
      'rgba(255, 99, 132, 0.8)',
      'rgba(54, 162, 235, 0.8)',
      'rgba(255, 206, 86, 0.8)',
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
  }//end of nginit

  radioChange(event){
    let index = 0;

    if (event.value == 'monthly')
      index = 1;
    else if(event.value == 'weekly')
      index = 2;

    else if(event.value == 'daily')
      index = 3;

    this.data = [0,0,0,0,0,0]; // Initialize playtime of all classes to 0
    this.labels = ['Infiltrator', 'Light Assault', 'Medic','Engineer','Heavy Assault','Max'];

    // Gets forever, monthly, etc depending on val of index
    this.data[0] += this.playtime.get('infiltrator')[index];
    this.data[1] += this.playtime.get('light assault')[index];
    this.data[2] += this.playtime.get('medic')[index];
    this.data[3] += this.playtime.get('engineer')[index];
    this.data[4] += this.playtime.get('heavy assault')[index];
    this.data[5] += this.playtime.get('max')[index];
  }
}
