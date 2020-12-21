import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'node_modules/chart.js';

@Component({
  selector: 'app-playtimechart',
  templateUrl: './playtimechart.component.html',
  styleUrls: ['./playtimechart.component.scss']
})
export class PlaytimechartComponent implements OnInit {

  @Input() playtime: Map<string, Array<number>>;// class playtime data passed from app.component
  @Input() data_type: string;// determines if infantry or vehicle playtime
  @Input() index: number;// Determines which data to get from map.
                        // 0 for all time, 1 for monthly, 2 for weekly, etc
  @Input() chartId: string;//Workaround to let me resuse component multiple times
  @Input() displayOn: boolean = true;//toggle legend display on or off

  constructor() { }

  ngOnInit(): void {

  }//end of nginit

  // Referenced https://tobiasahlin.com/blog/chartjs-charts-to-get-you-started/#2-line-chart
  // https://www.chartjs.org/
  // used to display data related to playtime
  ngAfterViewInit(){
    Chart.defaults.global.defaultFontColor = 'white';

    // converts playtime to array to pass to chart
    let playtime_data = [];
    let labels = [];

    // set chart up for infantry playtime
    if(this.data_type === 'infantry'){
      playtime_data = [0,0,0,0,0,0];
      labels = ['Infiltrator', 'Light Assault', 'Medic','Engineer','Heavy Assault','Max'];

      // Gets all_time, monthly, etc depending on val of index
      playtime_data[0] += this.playtime.get('infiltrator')[this.index];
      playtime_data[1] += this.playtime.get('light assault')[this.index];
      playtime_data[2] += this.playtime.get('medic')[this.index];
      playtime_data[3] += this.playtime.get('engineer')[this.index];
      playtime_data[4] += this.playtime.get('heavy assault')[this.index];
      playtime_data[5] += this.playtime.get('max')[this.index];
    }
    // set chart up for vehicle playtime
    else{
      labels = ['Flash','Sunderer','Lightning','Magrider','Vanguard','Prowler',
      'Scythe','Reaver','Mosquito','Liberator','Galaxy','Harraser','Valkyrie',
      'Ant','Colossus','Bastion','Javelin'];
      playtime_data = [
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
    }

    var myChart = new Chart(this.chartId, {
      type: 'pie',
      data: {
          labels: labels,
          datasets: [{
              data: playtime_data,
              backgroundColor: [
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
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 100, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',

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
              ],
              borderWidth: 1
          }]//end of datasets
      },//end of data
      options: {
        legend: {
          display: this.displayOn
        }
      }
    });//end of new Chart
  }// end of ngAfterViewInit
}
