import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'node_modules/chart.js';

@Component({
  selector: 'app-linechart',
  templateUrl: './linechart.component.html',
  styleUrls: ['./linechart.component.scss']
})
export class LinechartComponent implements OnInit {
  // Data passed from app.component.
  // Guaranteed to be a map of the structure
  // monthly/weekly/daily -> [month array]/[week array]/[day array]
  @Input() data: Map<string, Array<number>>;

  @Input() index: number;// Determines which data to get from map.
                        // 0 for all time, 1 for monthly, 2 for weekly, etc
  @Input() linechartId: string;// Workaround to let me resuse component multiple times
  @Input() label: string;// string to label chart

  constructor() { }

  ngOnInit(): void {
  }

  // Referenced https://tobiasahlin.com/blog/chartjs-charts-to-get-you-started/#2-line-chart
  // https://www.chartjs.org/

  // Used to display the data for base captures/defenses
  ngAfterViewInit(){
    Chart.defaults.global.defaultFontColor = 'white';

    let data_array = [];//data to supply to chart
    let labels = [];//labels for chart

    // Gets monthly, weekly or daily depending on val of index.
    // Also set appropriate labels
    if(this.index == 0){
      data_array = this.data.get('monthly');
      labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug',
               'Sep', 'Oct', 'Nov', 'Dec'];
    }
    else if(this.index == 1){
      data_array = this.data.get('weekly');
      labels = ['W1', 'W2', 'W3', 'W4', 'W5', 'W6', 'W7', 'W8',
               'W9', 'W10', 'W11', 'W12', 'W13'];
    }
    else{
      data_array = this.data.get('daily');
      labels = ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8', 'D9', 'D10',
               'D11', 'D12', 'D13','D14','D15','D16', 'D17', 'D18', 'D19',
               'D20', 'D21', 'D22', 'D23','D24','D25','D26', 'D27', 'D28',
               'D29', 'D30','D31'];
    }

    var myChart = new Chart(this.linechartId, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [{
          data: data_array,
          label: this.label,
          borderColor: '#c45850',
          fill: false
        }]
      },
    });//end of new Chart
  }// end of ngAfterViewInit
}
