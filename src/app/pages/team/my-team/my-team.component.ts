import { ThisReceiver } from '@angular/compiler';
import { Component, OnInit } from '@angular/core';
import { ConfirmationService, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Hero } from 'src/app/dto/hero';
import { Team } from 'src/app/dto/team';

@Component({
  selector: 'app-my-team',
  templateUrl: './my-team.component.html',
  styleUrls: ['./my-team.component.css'],
  providers: [DialogService, ConfirmationService, MessageService]
})
export class MyTeamComponent implements OnInit {
  infoTeam: Team = new Team();
  heroInfo: Hero[] = [];
  isDisabled: boolean = true;
  nameTeam: string = '';
  description: string = '';
  constructor(public dialogService: DialogService,
    private confirmationService: ConfirmationService, private messageService: MessageService,) {
      this.generateTeam();
  }

  ngOnInit(): void {
  }

  deleteTeam(idHero: number, nameHero: string) {
    this.confirmationService.confirm({
      header: 'Delete Hero from your team',
      message: 'Are you sure that you want expel from your ' + this.infoTeam.name + ' to ' + nameHero + '?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: nameHero + ' has left the' });
        let heroesFiltered = this.infoTeam.heroes.filter(hero => hero.id != idHero);
        //  const index = array.indexOf(idHero);
        console.log("hero to delete", heroesFiltered)
        this.infoTeam.heroes = [];
        this.infoTeam.heroes = heroesFiltered;
        localStorage.setItem('team', JSON.stringify(this.infoTeam));
        let dato = localStorage.getItem('team')
        console.log(dato);
        this.generateTeam();
      },
    });

  }

  generateTeam(){
    let infoJson = localStorage.getItem('team');
    this.infoTeam = infoJson !== null ? JSON.parse(infoJson) : new Team();
    this.heroInfo = this.infoTeam.heroes;
    this.nameTeam = this.infoTeam.name;
    this.description = this.infoTeam.description;
  }

  edit() {
    console.log("disabled",)
    this.isDisabled = false;
  }

  save() {
    console.log("info", this.nameTeam, this.description)
    this.infoTeam.name = this.nameTeam;
    this.infoTeam.description = this.description;
    localStorage.setItem('team', JSON.stringify(this.infoTeam));
    let dato = localStorage.getItem('team')
    console.log(dato);
    this.isDisabled = true;
  }
}
