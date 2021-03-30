// Class to store the data retrieved from the API
export class Character {
  //1=infil,3=light assault,4=medic,5=engineer,6=heavy assault,7=max
  id: string;
  name: string;
  lastSavedData: string;//API saves data from the last time player logged in. Var used to inform player of how old the data is
  faction: string;//faction_id 1=vs, 2=nc, 3=tr (converted to name in constructor)
  total_playtime: number;//times->hrs played
  class_playtime: Map<string,Array<number>>;//infantry class->hrs played
  vehicle_playtime: Map<string,number>;//vehicle->hrs played

  br: number;
  br_progress: number;

  total_certs: number;
  certs: number;//available certs
  certs_progress: number;

  total_deaths: number;
  deaths: Map<string,Array<number>>;//{all time: deaths, month: deaths...}
  class_deaths: Map<string,number>;//deaths as X class {medic: deaths...} stat [33-38]
  killed_by_infantry: Map<string,number>;//class of killer {heavy assault: killer...}

  total_kills: number;
  kills: Map<string,Array<number>>;//{all time: kills, month: kills...}
  kills_as_infantry: Map<string,number>;//{engineer: kills, max: kills...}
  kills_with_vehicle: Map<string,number>;//{prowler: kills...}

  total_captures: number;
  total_defenses: number;
  facility_captures: Map<string,Array<number>>;//{all time: captures...}
  facility_defenses: Map<string,Array<number>>;//{all time: defenses...}

  // Constructor loads the basic info of a player, and initalizes maps
  constructor(id, name, faction, playtime, br, certs, kills, deaths, captures, defenses, lastSave){
    this.id = id;
    this.name = name;
    this.lastSavedData = lastSave;

    // Converting faction id to faction name
    switch (faction){
      case '1':{
        this.faction = 'Vanu Sovereignty (VS)';
        break;
      }
      case '2':{
        this.faction = 'New Conglomerate (NC)';
        break;
      }
      case '3':{
        this.faction = 'Terran Republic (TR)';
        break;
      }
      default:{
        this.faction = 'Nanite Systems Operative (NSO)';
        break;
      }
    }//end switch

    this.total_playtime = Math.floor(playtime/60);//Converts to hours
    this.total_kills = kills;
    this.total_deaths = deaths;
    this.total_captures = captures;
    this.total_defenses = defenses;

    this.br = parseFloat(br['value']);
    this.br_progress = parseFloat(br['percent_to_next']);

    this.total_certs = certs['earned_points'];
    this.certs = parseFloat(certs['available_points']);
    this.certs_progress = parseFloat(certs['percent_to_next']);

    // Initialize playtime map
    this.class_playtime = new Map([
      ['infiltrator', [0,0,0,0]],
      ['light assault', [0,0,0,0]],
      ['medic', [0,0,0,0]],
      ['engineer', [0,0,0,0]],
      ['heavy assault', [0,0,0,0]],
      ['max', [0,0,0,0]]
    ]);

    // Initialize kill and deaths map
    this.kills = new Map([
      ['all time', [0,0,0]],
      ['monthly', [0,0,0]],
      ['weekly', [0,0,0]],
      ['daily', [0,0,0]]
    ]);

    this.deaths = new Map([
      ['all time', [0,0,0]],
      ['monthly', [0,0,0]],
      ['weekly', [0,0,0]],
      ['daily', [0,0,0]]
    ]);

    // Initialize maps related to infantry classes.
    // Kills as infantry class
    // Killed by infantry class (class of player who killed you)
    // Deaths as infantry class
    // Array indices represent faction of player(s). 0=vs,1=nc,2=tr
    this.kills_as_infantry = new Map([
      ['infiltrator', 0],
      ['light assault', 0],
      ['medic', 0],
      ['engineer', 0],
      ['heavy assault', 0],
      ['max', 0]
    ]);

    this.killed_by_infantry = new Map([
      ['infiltrator', 0],
      ['light assault', 0],
      ['medic', 0],
      ['engineer', 0],
      ['heavy assault', 0],
      ['max', 0]
    ]);

    // Array indices represent total deaths all time, monthly, weekly, and daily
    this.class_deaths = new Map([
      ['infiltrator', 0],
      ['light assault', 0],
      ['medic', 0],
      ['engineer', 0],
      ['heavy assault', 0],
      ['max', 0]
    ]);

    // Initialize vehicle maps
    this.kills_with_vehicle = new Map([
      [ 'flash', 0 ],
      [ 'sunderer', 0 ],
      [ 'lightning', 0 ],
      [ 'magrider', 0 ],
      [ 'vanguard', 0 ],
      [ 'prowler', 0 ],
      [ 'scythe', 0 ],
      [ 'reaver', 0 ],
      [ 'mosquito', 0 ],
      [ 'liberator', 0 ],
      [ 'galaxy', 0 ],
      [ 'harasser', 0 ],
      [ 'valkyrie', 0 ],
      [ 'ant', 0 ],
      [ 'colossus', 0 ],
      [ 'bastion', 0 ],
      [ 'javelin', 0 ]
    ]);

    this.vehicle_playtime = new Map([
      [ 'flash', 0 ],
      [ 'sunderer', 0 ],
      [ 'lightning', 0 ],
      [ 'magrider', 0 ],
      [ 'vanguard', 0 ],
      [ 'prowler', 0 ],
      [ 'scythe', 0 ],
      [ 'reaver', 0 ],
      [ 'mosquito', 0 ],
      [ 'liberator', 0 ],
      [ 'galaxy', 0 ],
      [ 'harasser', 0 ],
      [ 'valkyrie', 0 ],
      [ 'ant', 0 ],
      [ 'colossus', 0 ],
      [ 'bastion', 0 ],
      [ 'javelin', 0 ]
    ]);

    // Initialize facility capture and defense maps
    this.facility_captures = new Map([
      ['monthly', [0,0,0,0,0,0,0,0,0,0,0,0]],
      ['weekly', [0,0,0,0,0,0,0,0,0,0,0,0,0]],
      ['daily', [0,0,0,0,0,0,0,0,0,0,0,0,
                  0,0,0,0,0,0,0,0,0,0,0,0,
                  0,0,0,0,0,0,0]]
    ]);

    this.facility_defenses = new Map([
      ['monthly', [0,0,0,0,0,0,0,0,0,0,0,0]],
      ['weekly', [0,0,0,0,0,0,0,0,0,0,0,0,0]],
      ['daily', [0,0,0,0,0,0,0,0,0,0,0,0,
                  0,0,0,0,0,0,0,0,0,0,0,0,
                  0,0,0,0,0,0,0]]
    ]);
  }//end constructor

  // Loads data related to class playtime and vehicle time.
  //
  // Maps infantry class to an array representing:
  //  all time
  //  monthly
  //  weekly
  //  daily
  //
  // Maps vehicle to total hrs (API only supports total playtime)
  //
  // Paramaters:
  // data: json for infantry data
  // data2: json for vehicle data
  loadPlaytimeData(data, data2){
    // Load all time data. Convert time to hrs
    this.class_playtime.get('infiltrator')[0] += Math.floor(data[4]['value_forever']/3600);
    this.class_playtime.get('light assault')[0] += Math.floor(data[5]['value_forever']/3600);
    this.class_playtime.get('medic')[0] += Math.floor(data[6]['value_forever']/3600);
    this.class_playtime.get('engineer')[0] += Math.floor(data[7]['value_forever']/3600);
    this.class_playtime.get('heavy assault')[0] += Math.floor(data[8]['value_forever']/3600);
    this.class_playtime.get('max')[0] += Math.floor(data[9]['value_forever']/3600);

    // Load Monthly data. Convert time to hrs
    this.class_playtime.get('infiltrator')[1] += Math.floor(data[4]['value_monthly']/3600);
    this.class_playtime.get('light assault')[1] += Math.floor(data[5]['value_monthly']/3600);
    this.class_playtime.get('medic')[1] += Math.floor(data[6]['value_monthly']/3600);
    this.class_playtime.get('engineer')[1] += Math.floor(data[7]['value_monthly']/3600);
    this.class_playtime.get('heavy assault')[1] += Math.floor(data[8]['value_monthly']/3600);
    this.class_playtime.get('max')[1] += Math.floor(data[9]['value_monthly']/3600);

    // Load weekly data. Convert time to hrs
    this.class_playtime.get('light assault')[2] += Math.floor(data[5]['value_weekly']/3600);
    this.class_playtime.get('medic')[2] += Math.floor(data[6]['value_weekly']/3600);
    this.class_playtime.get('engineer')[2] += Math.floor(data[7]['value_weekly']/3600);
    this.class_playtime.get('heavy assault')[2] += Math.floor(data[8]['value_weekly']/3600);
    this.class_playtime.get('max')[2] += Math.floor(data[9]['value_weekly']/3600);

    // Load daily data. Convert time to hrs
    this.class_playtime.get('infiltrator')[3] += Math.floor(data[4]['value_daily']/3600);
    this.class_playtime.get('light assault')[3] += Math.floor(data[5]['value_daily']/3600);
    this.class_playtime.get('medic')[3] += Math.floor(data[6]['value_daily']/3600);
    this.class_playtime.get('engineer')[3] += Math.floor(data[7]['value_daily']/3600);
    this.class_playtime.get('heavy assault')[3] += Math.floor(data[8]['value_daily']/3600);
    this.class_playtime.get('max')[3] += Math.floor(data[9]['value_daily']/3600);

    // Load vehicle playtime
    for(let i=0;i<data2.length;++i){
      let vehicle_id = data2[i]['vehicle_id'];
      // If data is play time, and is vehicle (id not 0) add time to vehicle key
      if(data2[i]['stat_name'] === 'weapon_play_time' && vehicle_id != '0'){
          if (vehicle_id === '1')
            this.vehicle_playtime.set('flash',
            Math.floor(this.vehicle_playtime.get('flash')+data2[i]['value']/3600));

          if (vehicle_id === '2')
            this.vehicle_playtime.set('sunderer',
            Math.floor(this.vehicle_playtime.get('sunderer')+data2[i]['value']/3600));

          if (vehicle_id === '3')
            this.vehicle_playtime.set('lightning',
            Math.floor(this.vehicle_playtime.get('lightning')+data2[i]['value']/3600));

          if (vehicle_id === '4')
            this.vehicle_playtime.set('magrider',
            Math.floor(this.vehicle_playtime.get('magrider')+data2[i]['value']/3600));

          if (vehicle_id === '5')
            this.vehicle_playtime.set('vanguard',
            Math.floor(this.vehicle_playtime.get('vanguard')+data2[i]['value']/3600));

          if (vehicle_id === '6')
            this.vehicle_playtime.set('prowler',
            Math.floor(this.vehicle_playtime.get('prowler')+data2[i]['value']/3600));

          if (vehicle_id === '7')
            this.vehicle_playtime.set('scythe',
            Math.floor(this.vehicle_playtime.get('scythe')+data2[i]['value']/3600));

          if (vehicle_id === '8')
            this.vehicle_playtime.set('reaver',
            Math.floor(this.vehicle_playtime.get('reaver')+data2[i]['value']/3600));

          if (vehicle_id === '9')
          this.vehicle_playtime.set('mosquito',
          Math.floor(this.vehicle_playtime.get('mosquito')+data2[i]['value']/3600));

          if (vehicle_id === '10')
            this.vehicle_playtime.set('liberator',
            Math.floor(this.vehicle_playtime.get('liberator')+data2[i]['value']/3600));

          if (vehicle_id === '11')
            this.vehicle_playtime.set('galaxy',
            Math.floor(this.vehicle_playtime.get('galaxy')+data2[i]['value']/3600));

          if (vehicle_id === '12')
            this.vehicle_playtime.set('harasser',
            Math.floor(this.vehicle_playtime.get('harasser')+data2[i]['value']/3600));

          if (vehicle_id === '14')
            this.vehicle_playtime.set('valkyrie',
            Math.floor(this.vehicle_playtime.get('valkyrie')+data2[i]['value']/3600));

          if (vehicle_id === '15')
            this.vehicle_playtime.set('ant',
            Math.floor(this.vehicle_playtime.get('ant')+data2[i]['value']/3600));

          if (vehicle_id === '2007')
            this.vehicle_playtime.set('colossus',
            Math.floor(this.vehicle_playtime.get('colossus')+data2[i]['value']/3600));

          if (vehicle_id === '2010')
            this.vehicle_playtime.set('flash',
            Math.floor(this.vehicle_playtime.get('flash')+data2[i]['value']/3600));

          if (vehicle_id === '2019')
            this.vehicle_playtime.set('bastion',this.vehicle_playtime.get('bastion')+data2[i]['value']/3600);

          if (vehicle_id === '2030')
            this.vehicle_playtime.set('javelin',
            Math.floor(this.vehicle_playtime.get('javelin')+data2[i]['value']/3600));

          if (vehicle_id === '2125')
            this.vehicle_playtime.set('javelin',
            Math.floor(this.vehicle_playtime.get('javelin')+data2[i]['value']/3600));

          if (vehicle_id === '2129')
            this.vehicle_playtime.set('javelin',
            Math.floor(this.vehicle_playtime.get('javelin')+data2[i]['value']/3600));
        }// end of if
    }// end of for
  }//end of loadPlaytimeData

  // Loads in data related to kills:
  //   by both month/week/daily and faction (vs/nc/tr)
  //   by infantry class
  //
  // Parameters:
  // data: json array for kills
  loadKillsData(data){
    // Load kills by time and faction. Divided by 1 to convert str to int
    let kills = data[16];
    this.kills.get('all time')[0] = kills['value_forever_vs']/1;
    this.kills.get('all time')[1] = kills['value_forever_nc']/1;
    this.kills.get('all time')[2] = kills['value_forever_tr']/1;

    this.kills.get('monthly')[0] = kills['value_monthly_vs']/1;
    this.kills.get('monthly')[1] = kills['value_monthly_nc']/1;
    this.kills.get('monthly')[2] = kills['value_monthly_tr']/1;

    this.kills.get('weekly')[0] = kills['value_weekly_vs']/1;
    this.kills.get('weekly')[1] = kills['value_weekly_nc']/1;
    this.kills.get('weekly')[2] = kills['value_weekly_tr']/1;

    this.kills.get('daily')[0] = kills['value_daily_vs']/1;
    this.kills.get('daily')[1] = kills['value_daily_nc']/1;
    this.kills.get('daily')[2] = kills['value_daily_tr']/1;

    // Load kills by class. Adds all kills from all factions together for total kills.
    // View of faction kills can be seen in overall stat.
    this.kills_as_infantry.set('infiltrator', data[1]['value_forever_vs']/1 + data[1]['value_forever_nc']/1 + data[1]['value_forever_tr']/1);
    this.kills_as_infantry.set('light assault', data[2]['value_forever_vs']/1 + data[2]['value_forever_nc']/1 + data[2]['value_forever_tr']/1);
    this.kills_as_infantry.set('medic', data[3]['value_forever_vs']/1 + data[3]['value_forever_nc']/1 + data[3]['value_forever_tr']/1);
    this.kills_as_infantry.set('engineer', data[4]['value_forever_vs']/1 + data[4]['value_forever_nc']/1 + data[4]['value_forever_tr']/1);
    this.kills_as_infantry.set('heavy assault', data[5]['value_forever_vs']/1 + data[5]['value_forever_nc']/1 + data[5]['value_forever_tr']/1);
    this.kills_as_infantry.set('max', data[6]['value_forever_vs']/1 + data[6]['value_forever_nc']/1 + data[6]['value_forever_tr']/1);
  }// end of loadKillsData

  // Loads in kills with a vehicle for player.
  //
  // maps vehicle to kills gotten with vehicle
  //
  // Paramaters:
  // data : json containing vehicle data
  loadVehicleKills(data){
    for(let i=0;i<data.length;++i){
      let vehicle_id = data[i]['vehicle_id'];
      // If data is weapon kill and is vehicle (id not 0), add value
      if(data[i]['stat_name'] === 'weapon_kills' && vehicle_id != '0'){
        let sum_kills = data[i]['value_vs']/1+data[i]['value_nc']/1+data[i]['value_tr']/1;
        if (vehicle_id === '1')
          this.kills_with_vehicle.set('flash',this.kills_with_vehicle.get('flash')+sum_kills);

        if (vehicle_id === '2')
          this.kills_with_vehicle.set('sunderer',this.kills_with_vehicle.get('sunderer')+sum_kills);

        if (vehicle_id === '3')
          this.kills_with_vehicle.set('lightning',this.kills_with_vehicle.get('lightning')+sum_kills);

        if (vehicle_id === '4')
          this.kills_with_vehicle.set('magrider',this.kills_with_vehicle.get('magrider')+sum_kills);

        if (vehicle_id === '5')
          this.kills_with_vehicle.set('vanguard',this.kills_with_vehicle.get('vanguard')+sum_kills);

        if (vehicle_id === '6')
          this.kills_with_vehicle.set('prowler',this.kills_with_vehicle.get('prowler')+sum_kills);

        if (vehicle_id === '7')
          this.kills_with_vehicle.set('scythe',this.kills_with_vehicle.get('scythe')+sum_kills);

        if (vehicle_id === '8')
          this.kills_with_vehicle.set('reaver',this.kills_with_vehicle.get('reaver')+sum_kills);

        if (vehicle_id === '9')
        this.kills_with_vehicle.set('mosquito',this.kills_with_vehicle.get('mosquito')+sum_kills);

        if (vehicle_id === '10')
          this.kills_with_vehicle.set('liberator',this.kills_with_vehicle.get('liberator')+sum_kills);

        if (vehicle_id === '11')
          this.kills_with_vehicle.set('galaxy',this.kills_with_vehicle.get('galaxy')+sum_kills);

        if (vehicle_id === '12')
          this.kills_with_vehicle.set('harasser',this.kills_with_vehicle.get('harasser')+sum_kills);

        if (vehicle_id === '14')
          this.kills_with_vehicle.set('valkyrie',this.kills_with_vehicle.get('valkyrie')+sum_kills);

        if (vehicle_id === '15')
          this.kills_with_vehicle.set('ant',this.kills_with_vehicle.get('ant')+sum_kills);

        if (vehicle_id === '2007')
          this.kills_with_vehicle.set('colossus',this.kills_with_vehicle.get('colossus')+sum_kills);

        if (vehicle_id === '2010')
          this.kills_with_vehicle.set('flash',this.kills_with_vehicle.get('flash')+sum_kills);

        if (vehicle_id === '2019')
          this.kills_with_vehicle.set('bastion',this.kills_with_vehicle.get('bastion')+sum_kills);

        if (vehicle_id === '2030')
          this.kills_with_vehicle.set('javelin',this.kills_with_vehicle.get('javelin')+sum_kills);

        if (vehicle_id === '2125')
          this.kills_with_vehicle.set('javelin',this.kills_with_vehicle.get('javelin')+sum_kills);

        if (vehicle_id === '2129')
          this.kills_with_vehicle.set('javelin',this.kills_with_vehicle.get('javelin')+sum_kills);
      }// end of if check for
    }// end of for
  }// end of loadVehicleData

  // Loads in data related to kills:
  //   by month/week/daily and by faction (vs/nc/tr) (array rep faction for period)
  //   by infantry class of killer
  //   by infantry class used when killed (class of player)
  //
  // Parameters:
  // data: json array for kills
  loadDeathData(data){
    //stat [33-38]

    let killer_data = data['stat_by_faction'];// where class of killer is
    let death_data = data['stat'];// where death as X class is

    // iterate through indices containing enemy class
    for(let i=8; i<14;++i){
      // Load deaths by time and faction. Divided by 1 to convert string to int
      this.deaths.get('all time')[0] += killer_data[i]['value_forever_vs']/1;
      this.deaths.get('all time')[1] += killer_data[i]['value_forever_nc']/1;
      this.deaths.get('all time')[2] += killer_data[i]['value_forever_tr']/1;

      this.deaths.get('monthly')[0] += killer_data[i]['value_monthly_vs']/1;
      this.deaths.get('monthly')[1] += killer_data[i]['value_monthly_nc']/1;
      this.deaths.get('monthly')[2] += killer_data[i]['value_monthly_tr']/1;

      this.deaths.get('weekly')[0] += killer_data[i]['value_weekly_vs']/1;
      this.deaths.get('weekly')[1] += killer_data[i]['value_weekly_nc']/1;
      this.deaths.get('weekly')[2] += killer_data[i]['value_weekly_tr']/1;

      this.deaths.get('daily')[0] += killer_data[i]['value_daily_vs']/1;
      this.deaths.get('daily')[1] += killer_data[i]['value_daily_nc']/1;
      this.deaths.get('daily')[2] += killer_data[i]['value_daily_tr']/1;
    }

    //console.log(this.deaths);

    // Load deaths by class of killer
    this.killed_by_infantry.set('infiltrator', killer_data[8]['value_forever_vs']/1 + killer_data[8]['value_forever_nc']/1 + killer_data[8]['value_forever_tr']/1);
    this.killed_by_infantry.set('light assault', killer_data[9]['value_forever_vs']/1 + killer_data[9]['value_forever_nc']/1 + killer_data[9]['value_forever_tr']/1);
    this.killed_by_infantry.set('medic', killer_data[10]['value_forever_vs']/1 + killer_data[10]['value_forever_nc']/1 + killer_data[10]['value_forever_tr']/1);
    this.killed_by_infantry.set('engineer', killer_data[11]['value_forever_vs']/1 + killer_data[11]['value_forever_nc']/1 + killer_data[11]['value_forever_tr']/1);
    this.killed_by_infantry.set('heavy assault', killer_data[12]['value_forever_vs']/1 + killer_data[12]['value_forever_nc']/1 + killer_data[12]['value_forever_tr']/1);
    this.killed_by_infantry.set('max', killer_data[13]['value_forever_vs']/1 + killer_data[13]['value_forever_nc']/1 + killer_data[13]['value_forever_tr']/1);

    //console.log(this.killed_by_infantry);

    // Load deaths by class player died as
    this.class_deaths.set('infiltrator', death_data[33]['value_forever']/1 );
    this.class_deaths.set('light assault', death_data[34]['value_forever']/1 );
    this.class_deaths.set('medic', death_data[35]['value_forever']/1 );
    this.class_deaths.set('engineer', death_data[36]['value_forever']/1);
    this.class_deaths.set('heavy assault', death_data[37]['value_forever']/1);
    this.class_deaths.set('max', death_data[38]['value_forever']/1);

    //console.log(this.class_deaths);
  }// end of load death data

  // Loads in base captures/defenses.
  //
  // Paramaters:
  // data : json containing base capture/defense data. API captures data from most recent to least.
  loadBaseData(data){
    // load monthly base captures
    for(let i=0, j=12; i<12;++i,--j){
      if(j<10){
        this.facility_captures.get('monthly')[i] += parseInt(data['facility_capture']['month']['m0'+(j)]);
      }
      else{
        this.facility_captures.get('monthly')[i] += parseInt(data['facility_capture']['month']['m'+(j)]);
      }
    }

    // load weekly base captures
    for(let i=0, j=13; i<13;++i,--j){
      if(j<10){
        this.facility_captures.get('weekly')[i] += parseInt(data['facility_capture']['week']['w0'+(j)]);
      }
      else{
        this.facility_captures.get('weekly')[i] += parseInt(data['facility_capture']['week']['w'+(j)]);
      }
    }

    // load daily base captures
    for(let i=0, j=31; i<31;++i,--j){
      if(j<10){
        this.facility_captures.get('daily')[i] += parseInt(data['facility_capture']['day']['d0'+(j)]);
      }
      else{
        this.facility_captures.get('daily')[i] += parseInt(data['facility_capture']['day']['d'+(j)]);
      }
    }

    // load monthly base defenses
    for(let i=0, j=12; i<12;++i,--j){
      if(j<10){
        this.facility_defenses.get('monthly')[i] += parseInt(data['facility_defend']['month']['m0'+(j)]);
      }
      else{
        this.facility_defenses.get('monthly')[i] += parseInt(data['facility_defend']['month']['m'+(j)]);
      }
    }

    // load weekly base defenses
    for(let i=0, j=13; i<13;++i,--j){
      if(j<10){
        this.facility_defenses.get('weekly')[i] += parseInt(data['facility_defend']['week']['w0'+(j)]);
      }
      else{
        this.facility_defenses.get('weekly')[i] += parseInt(data['facility_defend']['week']['w'+(j)]);
      }
    }

    // Load daily base defenses
    for(let i=0, j=31; i<31;++i,--j){
      if(j<10){
        this.facility_defenses.get('daily')[i] += parseInt(data['facility_defend']['day']['d0'+(j)]);
      }
      else{
        this.facility_defenses.get('daily')[i] += parseInt(data['facility_defend']['day']['d'+(j)]);
      }
    }
  }//end of loadBaseData
}
