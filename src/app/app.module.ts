import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { HttpClientModule } from '@angular/common/http';
import { ps2ApiService } from './services/ps2api.service';

import { MatCardModule } from '@angular/material/card';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import {MatProgressSpinnerModule} from '@angular/material/progress-spinner';
import { MatRadioModule } from '@angular/material/radio';
import { MatInputModule } from '@angular/material/input';
import { MatTabsModule } from '@angular/material/tabs';

import { FlexLayoutModule } from '@angular/flex-layout';
import { PlaytimeComponent } from './playtime/playtime.component';
import { KillchartComponent } from './killchart/killchart.component';
import { DeathchartComponent } from './deathchart/deathchart.component';
import { BasechartComponent } from './basechart/basechart.component';
import { LinechartComponent } from './linechart/linechart.component';
import { KdchartComponent } from './kdchart/kdchart.component';
import { PiechartComponent } from './piechart/piechart.component';

@NgModule({
  declarations: [
    AppComponent,
    PlaytimeComponent,
    KillchartComponent,
    DeathchartComponent,
    BasechartComponent,
    LinechartComponent,
    KdchartComponent,
    PiechartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatCardModule,
    MatProgressBarModule,
    MatProgressSpinnerModule,
    MatRadioModule,
    MatInputModule,
    MatTabsModule,
    FlexLayoutModule,
    FormsModule
  ],
  providers: [ps2ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
