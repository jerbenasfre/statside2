import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable()
export class ps2ApiService {

  constructor(private httpclient: HttpClient){
    //https://www.youtube.com/watch?v=rdLJNGZvlAA
  }

  getCharacterId(name: string): Observable<any>{
    let param1 = new HttpParams().set('name.first_lower',name.toLowerCase());
    return this.httpclient.get("https://census.daybreakgames.com/get/ps2:v2/character",{
      params:param1
    });
  }
  getCharacter(char_id: string): Observable<any>{
    let param1 = new HttpParams().set('character_id',char_id);
    return this.httpclient.get("https://census.daybreakgames.com/get/ps2:v2/single_character_by_id",{
      params:param1
    });
  }
}
