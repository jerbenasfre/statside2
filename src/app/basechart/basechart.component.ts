import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'node_modules/chart.js';

@Component({
  selector: 'app-basechart',
  template: `<app-piechart *ngIf='data' [data]='data' [labels]='labels' [colors]='colors' [pieChartId]='chartId' [displayLegend]='displayLegend'></app-piechart>`
})
export class BasechartComponent implements OnInit {
  // Base capture and base defense data.
  // value are Array<number>
  // 12 indices for month, 13 for week, and 31 for day
  @Input() base_capture: Map<string, Array<number>>;
  @Input() base_defense: Map<string, Array<number>>;

  @Input() index: number;// Determines which data to get from map.
                        // 0 for all time, 1 for monthly, 2 for weekly, etc
  @Input() chartId: string;//Workaround to let me resuse component multiple times

  data = [];
  labels = [];
  colors = [];
  displayLegend = true;

  constructor() { }

  // used to display capture/defense ratio
  ngOnInit(): void {
    Chart.defaults.global.defaultFontColor = 'white';
    // converts playtime to array to pass to chart
    let capture_data = 0;
    let defense_data = 0;

    let period = '';//selected time period(monthly/weekly/daily)

    // Gets monthly, weekly or daily depending on val of index
    if(this.index == 0){
      period='monthly';
    }
    else if(this.index == 1){
      period='weekly';
    }
    else{
      period='daily';
    }

    // Get the current month
    if(period == 'monthly'){
      var date = new Date();
      var month = date.getMonth();

      capture_data += this.base_capture.get(period)[month];
      defense_data += this.base_defense.get(period)[month];
    }
    // The last index of weekly/daily is the most recently saved data
    else {
      capture_data += this.base_capture.get(period)[this.base_capture.get(period).length-1];
      defense_data += this.base_defense.get(period)[this.base_defense.get(period).length-1];
    }

    this.data = [capture_data, defense_data];
    this.labels = ['Capture','Defense'];
    this.colors = ['#c45850','#3cba9f'];
  }
}
