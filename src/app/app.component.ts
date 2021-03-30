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
  characters !: Array<Character>;
  error: String;

  loading = false;

  constructor(private _ps2ApiService: ps2ApiService){
  }

  ngOnInit(){

  }

  loadData(name: string){

    if (name.trim() === ''){
      this.error = 'Character name cannot be empty.';
      return;
    }
    else
      this.error = '';

    this.character = null;  // Ensures data will be reloaded if a new char is searched
    this.loading = true;

    this._ps2ApiService.getCharacterId(name).subscribe(
      data =>{
        // Check if server is down
        if (data['error']){
          this.error = 'Error when requesting data from Planetside 2 API server.'
          this.loading = false;
          return;
        }

        // If no results, leave character as null
        if (data.length == 0){
          this.error = 'No results found for character: ' + name;
          this.loading = false;
          return;
        }
        else if (data['returned'] === 0){
          this.error = 'No results found for character: ' + name;
          this.loading = false;
          return;
        }

        let character_id = data['character_list'][0]['character_id'];

        this._ps2ApiService.getCharacter(character_id).subscribe(
          data =>{
            data = data['single_character_by_id_list'][0];
            let stats = data['stats'];

            // Instanstiates a character object with their id, name, faction, etc
            this.character = new Character(data['character_id'],data['name']['first'],
            data['faction_id'],data['times']['minutes_played'],data['battle_rank'],
            data['certs'],stats['stat_history']['kills']['all_time'],stats['stat_history']['deaths']['all_time'],
            stats['stat_history']['facility_capture']['all_time'],stats['stat_history']['facility_defend']['all_time'],
            data['times']['last_save_date'].split(' ')[0]);

            // Add to character list

            this.character.loadPlaytimeData(stats['stat'],stats['weapon_stat']);

            this.character.loadVehicleKills(stats['weapon_stat_by_faction']);

            this.character.loadKillsData(stats['stat_by_faction']);

            this.character.loadDeathData(stats);

            this.character.loadBaseData(stats['stat_history']);

            this.loading = false;
          }
        );
      }
    );
  }
}
