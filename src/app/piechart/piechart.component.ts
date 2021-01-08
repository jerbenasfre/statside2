import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'node_modules/chart.js';

@Component({
  selector: 'app-piechart',
  templateUrl: './piechart.component.html',
  styleUrls: ['./piechart.component.scss']
})
export class PiechartComponent implements OnInit {

  @Input() data: Array<any>;
  @Input() labels: Array<any>;
  @Input() colors: Array<any>;
  @Input() pieChartId: number; // Workaround to allow me to resuse chart components
  @Input() displayLegend: boolean = false;

  constructor() { }

  ngOnInit(): void { }

  ngAfterViewInit(){
    Chart.defaults.global.defaultFontColor = 'white';

    console.log("piechart");
    console.log(this.data);

    var myChart = new Chart(this.pieChartId, {
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
          display: this.displayLegend
        }
      }
    });//end of new Chart
  }
}
