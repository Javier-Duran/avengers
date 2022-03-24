import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { Team } from './dto/team';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'avengers';
  dockBasicItems: MenuItem[];
  defaultTeam: Team = new Team();

  constructor(private route: Router) {
    this.dockBasicItems = [
      {
        label: 'Welcome',
        icon: "assets/images/Marvel_Logo.svg.png",
        command: () => {
          this.route.navigate([''])
        }
      },
      {
        label: 'My Team',
        icon: "assets/images/pngegg.png",
        command: () => {
          this.route.navigate(['myTeam'])
        }
      },
      {
        label: 'Heroes',
        icon: "assets/images/pngwing.com.png",
        command: () => {
          this.route.navigate(['heroes'])
        }
      }
    ];
    localStorage.removeItem('team');
    if(localStorage.getItem('team') === null){
      localStorage.setItem('team', JSON.stringify(this.defaultTeam));
      let dato =localStorage.getItem('team');
      console.log("dato",dato);  
    }
    
  }
  
}

