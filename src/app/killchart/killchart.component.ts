import { Component, OnInit, Input } from '@angular/core';
import { Chart } from 'node_modules/chart.js';

@Component({
  selector: 'app-killchart',
  templateUrl: './killchart.component.html',
  styleUrls: ['./killchart.component.scss']
})
export class KillchartComponent implements OnInit {
  // kill_map can either be time/faction map or class kill map
  @Input() kill_map: Map<string, Array<number>>;
  @Input() kill_type: string;// var to determine how to label chart
  @Input() index: number;// Determines which data to get from map.
                        // 0 for all time, 1 for monthly, 2 for weekly, etc
  @Input() killchartId: string;//Workaround to let me resuse component multiple times
  @Input() displayOn: boolean = true;//boolean to turn legend on or off

  constructor() { }

  ngOnInit(): void {
  }

  // Referenced https://tobiasahlin.com/blog/chartjs-charts-to-get-you-started/#2-line-chart
  // https://www.chartjs.org/
  // Used to display data related to kills
  ngAfterViewInit(){
    Chart.defaults.global.defaultFontColor = 'white';

    let kill_data = [];//data to supply to chart
    let labels = [];//labels for chart

    // if overall view, display chart in terms of factions and get data
    // from chosen time period (this.index)
    if(this.kill_type === 'overall'){
      labels = ['VS','NC','TR'];

      if(this.index === 0){
        kill_data = this.kill_map.get('all_time');
      }
      else if (this.index === 1){
        kill_data = this.kill_map.get('monthly');
      }
      else if (this.index === 2){
        kill_data = this.kill_map.get('weekly');
      }
      else{
        kill_data = this.kill_map.get('daily');
      }
    }
    // if vehicle view, display in terms of vehicles and get vehicle data
    else if(this.kill_type === "vehicle"){
      labels = ["Flash","Sunderer","Lightning","Magrider","Vanguard","Prowler",
      "Scythe","Reaver","Mosquito","Liberator","Galaxy","Harraser","Valkyrie",
      "Ant","Colossus","Bastion","Javelin"];
      kill_data = [
        this.kill_map.get("flash"),
        this.kill_map.get("sunderer"),
        this.kill_map.get("lightning"),
        this.kill_map.get("magrider"),
        this.kill_map.get("vanguard"),
        this.kill_map.get("prowler"),
        this.kill_map.get("scythe"),
        this.kill_map.get("reaver"),
        this.kill_map.get("mosquito"),
        this.kill_map.get("liberator"),
        this.kill_map.get("galaxy"),
        this.kill_map.get("harasser"),
        this.kill_map.get("valkyrie"),
        this.kill_map.get("ant"),
        this.kill_map.get("colossus"),
        this.kill_map.get("bastion"),
        this.kill_map.get("javelin")];
    }
    // if infantry view, display in terms of classes and get classes data
    else{
      kill_data = [0,0,0,0,0,0];
      labels = ['Infiltrator', 'Light Assault', 'Medic','Engineer','Heavy Assault','Max'];

      kill_data[0] += this.kill_map.get('infiltrator')
      kill_data[1] += this.kill_map.get('light assault');
      kill_data[2] += this.kill_map.get('medic');
      kill_data[3] += this.kill_map.get('engineer');
      kill_data[4] += this.kill_map.get('heavy assault');
      kill_data[5] += this.kill_map.get('max');
    }

    var myChart = new Chart(this.killchartId, {
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
          data: kill_data
        }]
      },//end of data
      options: {
        legend: {
          display: this.displayOn
        }
      }
    });//end of new Chart
  }// end of ngAfterViewInit

}
