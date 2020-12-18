import { Component } from '@angular/core';
import { ps2ApiService } from './services/ps2api.service';
import { Character } from './data/character';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Statside 2: A Planetside 2 Stat Tracker';
  character!: Character;

  constructor(private _ps2ApiService: ps2ApiService){

  }

  ngOnInit(){

  }

  loadData(){
    this._ps2ApiService.getcharacter("5428868189741216657")
    .subscribe(
      data =>{
        console.log(data);

        data = data['single_character_by_id_list'][0];
        let stats = data["stats"];

        this.character = new Character(data["character_id"],data["name"]["first"],
        data["faction_id"],data["times"]["minutes_played"],data["battle_rank"],
        data["certs"],stats["stat_history"]["kills"]["all_time"],stats["stat_history"]["deaths"]["all_time"],
        stats["stat_history"]["facility_capture"]["all_time"],stats["stat_history"]["facility_defend"]["all_time"]);

        this.character.loadPlaytimeData(stats["stat"],stats["weapon_stat"]);

        this.character.loadVehicleKills(stats['weapon_stat_by_faction']);

        this.character.loadKillsData(stats["stat_by_faction"]);

        this.character.loadDeathData(stats);
        
        this.character.loadBaseData(stats["stat_history"]);
      }
    );
  }
}
