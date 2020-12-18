import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'node_modules/chart.js';

@Component({
  selector: 'app-basechart',
  templateUrl: './basechart.component.html',
  styleUrls: ['./basechart.component.scss']
})
export class BasechartComponent implements OnInit {
  // Base capture and base defense data.
  // value are Array<number>
  // 12 indices for month, 13 for week, and 31 for day
  @Input() base_capture: Map<string, Array<number>>;
  @Input() base_defense: Map<string, Array<number>>;

  @Input() index: number;// Determines which data to get from map.
                        // 0 for all time, 1 for monthly, 2 for weekly, etc
  @Input() basechartId: string;//Workaround to let me resuse component multiple times

  constructor() { }

  ngOnInit(): void {
  }

  // Referenced https://tobiasahlin.com/blog/chartjs-charts-to-get-you-started/#2-line-chart
  // https://www.chartjs.org/
  // used to display capture/defense ratio
  ngAfterViewInit(){
    Chart.defaults.global.defaultFontColor = 'white';

    // converts playtime to array to pass to chart
    let capture_data = 0;
    let defense_data = 0;

    let period = "";//selected time period(monthly/weekly/daily)

    // Gets monthly, weekly or daily depending on val of index
    if(this.index == 0){
      period="monthly";
    }
    else if(this.index == 1){
      period="weekly";
    }
    else{
      period="daily";
    }

    // Iterate through all elements of time frame array.
    // Get sum from both captures and defenses to compare
    for(let i=0;i<this.base_capture.get(period).length;i++){
      capture_data += this.base_capture.get(period)[i];
      defense_data += this.base_defense.get(period)[i];
    }

    var myChart = new Chart(this.basechartId, {
      type: 'pie',
      data: {
        labels: ["Capture","Defense"],
        datasets: [{
          backgroundColor: ["#c45850","#3cba9f"],
          data: [capture_data, defense_data]
        }]
      },
    });//end of new Chart
  }// end of ngAfterViewInit
}
