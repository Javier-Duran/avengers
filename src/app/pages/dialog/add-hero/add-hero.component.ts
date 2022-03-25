import { Component, OnInit } from '@angular/core';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ConfirmationService, ConfirmEventType, MessageService } from 'primeng/api';
import { Team } from 'src/app/dto/team';
import { MarvelService } from 'src/app/services/marvel.service';
import { Hero } from 'src/app/dto/hero';


@Component({
  selector: 'app-add-hero',
  templateUrl: './add-hero.component.html',
  styleUrls: ['./add-hero.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class AddHeroComponent implements OnInit {
  idHero: number = 0;
  nameHero: string = '';
  infoTeam: Team;
  constructor(public ref: DynamicDialogRef, public config: DynamicDialogConfig,
    private confirmationService: ConfirmationService, private messageService: MessageService,
    private mService: MarvelService) {

    let infoJson = localStorage.getItem('team');
    this.infoTeam = infoJson !== null ? JSON.parse(infoJson) : new Team();

  }

  ngOnInit(): void {
    this.idHero = this.config.data.id;
    this.nameHero = this.config.data.name;
    this.confirmationService.confirm({
      header: 'Add Hero to your team',
      message: 'Are you sure that you want to add ' + this.nameHero + ' to '+this.infoTeam.name+'?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: this.nameHero + ' has joined the avengers' });
        this.mService.getHeroDetail(this.idHero).subscribe(hero => {
          let heroToAdd: Hero = new Hero();
          heroToAdd.name = hero[0].name;
          heroToAdd.id = hero[0].id;
          heroToAdd.description = hero[0].description;
          heroToAdd.imageUrl = hero[0].thumbnail.path + '.' + hero[0].thumbnail.extension;
          this.infoTeam.heroes.push(heroToAdd);
          localStorage.setItem('team', JSON.stringify(this.infoTeam));
          let dato = localStorage.getItem('team')
          console.log(dato);
        })

      },
    });

  }

}
