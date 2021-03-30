import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'node_modules/chart.js';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.scss']
})
export class PiechartComponent implements OnInit {

  @Input() data: Array<any> = null;
  @Input() updated: boolean = false;
  @Input() labels: Array<any>;
  @Input() colors: Array<any>;
  @Input() pieChartId: number; // Workaround to allow me to resuse chart components
  @Input() displayLegend: boolean = false;

  myChart: Chart;

  constructor() { }

  ngOnChanges(changes){
    // First change is the initialization of graph. Subsequent changes are
    // updates to graph.
    if(changes['data'].firstChange != true){
      let empty = true;
      for(let i=0; i<this.data.length; ++i){
        if(this.data[i] != 0){
          empty = false;
          break;
        }
      }

      if(empty)
        this.data = null;
      else{
        this.myChart.data.datasets[0].data = this.data;
        this.myChart.update()
      }
    }
  }

  ngOnInit(): void {
    // Check to see if data is empty. If so, set data to null so html displays
    // "No Data"
    let empty = true;
    for(let i=0; i<this.data.length; ++i){
      if(this.data[i] != 0){
        empty = false;
        break;
      }
    }

    if(empty)
      this.data = null;
  }

  ngAfterViewInit(){
    if(this.data != null){
      Chart.defaults.global.defaultFontColor = 'white';

      this.myChart = new Chart(this.pieChartId, {
        type: 'pie',
        data: {
            labels: this.labels,
            datasets: [{
                data: this.data,
                backgroundColor: this.colors,
                borderColor: this.colors,
                borderWidth: 1
              }]//end of datasets
            },//end of data
        options: {
          legend: {
            display: this.displayLegend,
            labels:{
              boxWidth: 15
            }
          }
        }
      });//end of new Chart
    }
  }
}
