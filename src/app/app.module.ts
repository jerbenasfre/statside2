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
import { MatRadioModule } from '@angular/material/radio';

import { FlexLayoutModule } from '@angular/flex-layout';
import { PlaytimechartComponent } from './playtimechart/playtimechart.component';
import { KillchartComponent } from './killchart/killchart.component';
import { DeathchartComponent } from './deathchart/deathchart.component';
import { BasechartComponent } from './basechart/basechart.component';
import { LinechartComponent } from './linechart/linechart.component';
import { KdchartComponent } from './kdchart/kdchart.component';

@NgModule({
  declarations: [
    AppComponent,
    PlaytimechartComponent,
    KillchartComponent,
    DeathchartComponent,
    BasechartComponent,
    LinechartComponent,
    KdchartComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    NoopAnimationsModule,
    MatCardModule,
    MatProgressBarModule,
    MatRadioModule,
    FlexLayoutModule,
    FormsModule
  ],
  providers: [ps2ApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
