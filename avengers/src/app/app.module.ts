import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { TableHeroComponent } from './pages/table-hero/table-hero.component';
import { DetailHeroComponent } from './pages/detail-hero/detail-hero.component';
import { MyTeamComponent } from './pages/team/my-team/my-team.component';
import { DialogComponent } from './pages/common/dialog/dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    TableHeroComponent,
    DetailHeroComponent,
    MyTeamComponent,
    DialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
