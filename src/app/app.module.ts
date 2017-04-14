import { NgModule }      from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule }   from '@angular/forms'; // <-- NgModel lives here
import { RouterModule } from '@angular/router';

import { HeroDetailComponent } from'./hero-detail.component';
import { HeroesComponent } from './heroes.component';
import { DashboardComponent } from './dashboard.component';
import { HeroService } from './hero.service';

import { AppComponent }  from './app.component';


@NgModule({
  imports: [
    BrowserModule,
    FormsModule, // <-- import the FormsModule before binding with [(ngModel)]
    RouterModule.forRoot([
      {
        path : 'heroes',
        component : HeroesComponent
      },
      {
        path : 'dashboard',
        component : DashboardComponent
      }
    ])
  ],
  declarations: [
    AppComponent,
    HeroDetailComponent,
    DashboardComponent,
    HeroesComponent
  ],
  providers : [HeroService],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
