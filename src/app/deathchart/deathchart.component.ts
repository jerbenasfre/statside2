import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'node_modules/chart.js';

@Component({
  selector: 'app-deathchart',
  templateUrl: './deathchart.component.html',
  styleUrls: ['./deathchart.component.scss']
})
export class DeathchartComponent implements OnInit {
  // death_map can either be time/faction map or class death map
  @Input() death_map: Map<string, Array<number>>;
  @Input() death_type: string;// var to determine how to label chart
  @Input() index: number;// Determines which data to get from map.
                        // 0 for all time, 1 for monthly, 2 for weekly, etc
  @Input() deathchartId: string;//Workaround to let me resuse component multiple times

  constructor() { }

  ngOnInit(): void {
  }

  // Referenced https://tobiasahlin.com/blog/chartjs-charts-to-get-you-started/#2-line-chart
  // https://www.chartjs.org/
  // used to display deaths
  ngAfterViewInit(){
    Chart.defaults.global.defaultFontColor = 'white';

    let death_data = [];//data to supply to graph
    let labels = [];//label for graph

    // if general view,
    //  just show factions
    //  and get data according to chosen timeframe (this.index)
    if(this.death_type === 'overall'){
      labels = ['VS','NC','TR'];

      if(this.index === 0){
        death_data = this.death_map.get('all_time');
      }
      else if (this.index === 1){
        death_data = this.death_map.get('monthly');
      }
      else if (this.index === 2){
        death_data = this.death_map.get('weekly');
      }
      else{
        death_data = this.death_map.get('daily');
      }
    }
    // Other wise display data in terms of classes
    else{
      death_data = [0,0,0,0,0,0];
      labels = ['Infiltrator', 'Light Assault', 'Medic','Engineer','Heavy Assault','Max'];

      death_data[0] += this.death_map.get('infiltrator')
      death_data[1] += this.death_map.get('light assault');
      death_data[2] += this.death_map.get('medic');
      death_data[3] += this.death_map.get('engineer');
      death_data[4] += this.death_map.get('heavy assault');
      death_data[5] += this.death_map.get('max');
    }

    var myChart = new Chart(this.deathchartId, {
      type: 'pie',
      data: {
        labels: labels,
        datasets: [{
          backgroundColor: [
            'rgba(150, 0, 150, 0.8)',
            'rgba(0, 0, 255, 0.8)',
            'rgba(200, 0, 0, 0.8)',
            'rgba(75, 100, 192, 0.8)',
            'rgba(153, 102, 255, 0.8)',
            'rgba(255, 159, 64, 0.8)',],
          borderColor: [
            'rgba(150, 0, 150, 1)',
            'rgba(0, 0, 200, 1)',
            'rgba(150, 0, 0, 1)',
            'rgba(75, 100, 192, 1)',
            'rgba(153, 102, 255, 1)',
            'rgba(255, 159, 64, 1)',
          ],
          data: death_data
        }]
      }//end of data
    });//end of new Chart
  }// end of ngAfterViewInit
}
