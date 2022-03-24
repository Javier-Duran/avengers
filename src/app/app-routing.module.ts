import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroDetailComponent } from './pages/hero/hero-detail/hero-detail.component';
import { HeroTableComponent } from './pages/hero/hero-table/hero-table.component';
import { MyTeamComponent } from './pages/team/my-team/my-team.component';
import { WelcomeComponent } from './pages/welcome/welcome.component';

const routes: Routes = [
  {path: '', component: WelcomeComponent},
  {path: 'heroes', component: HeroTableComponent},
  {path: 'myTeam', component: MyTeamComponent},
  {path: 'heroe/:id', component: HeroDetailComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
