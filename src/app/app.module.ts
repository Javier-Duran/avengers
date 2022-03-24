import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule} from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';
import { HeroTableComponent } from './pages/hero/hero-table/hero-table.component';
import { HeroDetailComponent } from './pages/hero/hero-detail/hero-detail.component';
import { MyTeamComponent } from './pages/team/my-team/my-team.component';

import { CardModule } from 'primeng/card';
import {ButtonModule} from 'primeng/button';
import {TableModule} from 'primeng/table';
import {SliderModule} from 'primeng/slider';
import {DialogModule} from 'primeng/dialog';
import {MultiSelectModule} from 'primeng/multiselect';
import {ContextMenuModule} from 'primeng/contextmenu';
import {ToastModule} from 'primeng/toast';
import {InputTextModule} from 'primeng/inputtext';
import {ProgressBarModule} from 'primeng/progressbar';
import {DropdownModule} from 'primeng/dropdown';
import {CarouselModule} from 'primeng/carousel';
import {DockModule} from 'primeng/dock';
import { DynamicDialogModule } from 'primeng/dynamicdialog';
import { AddHeroComponent } from './pages/dialog/add-hero/add-hero.component';
import { DeleteHeroComponent } from './pages/dialog/delete-hero/delete-hero.component';
import {ConfirmDialogModule} from 'primeng/confirmdialog';
import {ConfirmationService} from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    WelcomeComponent,
    HeroTableComponent,
    HeroDetailComponent,
    MyTeamComponent,
    AddHeroComponent,
    DeleteHeroComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    CardModule,
    ButtonModule,
    TableModule,
    SliderModule,
    DropdownModule,
    ProgressBarModule,
    InputTextModule,
    ToastModule,
    ContextMenuModule,
    MultiSelectModule,
    DialogModule,
    CarouselModule,
    DockModule,
    ConfirmDialogModule,
  ],
  providers: [
    DynamicDialogModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
