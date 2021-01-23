import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'node_modules/chart.js';

@Component({
  selector: 'app-kdchart',
  template: `<app-piechart *ngIf='data; else elseBlock' [data]='data' [labels]='labels' [colors]='colors' [pieChartId]='chartId' [displayLegend]='displayLegend'></app-piechart>
             <ng-template #elseBlock><p>No data available.</p></ng-template>`
})
export class KdchartComponent implements OnInit {
  // kill_map and death_map containing time frames for kills/deaths to compare with
  @Input() kill_map: Map<string, Array<number>>;
  @Input() death_map: Map<string, Array<number>>;
  @Input() index: number;// Determines which data to get from map.
                        // 0 for all time, 1 for monthly, 2 for weekly, etc
  @Input() chartId: string;//Workaround to let me resuse component multiple times

  data = [];
  labels = [];
  colors = [];
  displayLegend = true;
  empty = false;

  constructor() { }

  //used to display kills and deaths as a ratio
  ngOnInit(): void {
    let kill_data = [];//var to store kill data
    let death_data = [];//var to store death data

    // Get data for kills/deaths from chosen timeframe (decided by this.index)
    if(this.index === 0){
      kill_data = this.kill_map.get('all_time');
      death_data = this.death_map.get('all_time');
    }
    else if (this.index === 1){
      kill_data = this.kill_map.get('monthly');
      death_data = this.death_map.get('monthly');
    }
    else if (this.index === 2){
      kill_data = this.kill_map.get('weekly');
      death_data = this.death_map.get('weekly');
    }
    else{
      kill_data = this.kill_map.get('daily');
      death_data = this.death_map.get('daily');
    }

    let sum_kills = 0;
    let sum_deaths = 0;
    //Get the sums of kills and deaths
    for(let i=0; i<kill_data.length;i++){
      sum_kills += kill_data[i];
      sum_deaths += death_data[i];
    }

    if (sum_kills == 0 || sum_deaths == 0)
      this.data = null;

    else{
      this.data = [sum_kills,sum_deaths];
      this.labels = ['Kills','Deaths'];
      this.colors = [
        'rgba(250, 200, 200, 0.8)',
        'rgba(200, 200, 250, 0.8)'];
    }
  }
}
