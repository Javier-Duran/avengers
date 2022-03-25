import { Component, OnInit, ViewChild } from '@angular/core';
import { ConfirmationService, LazyLoadEvent, MessageService } from 'primeng/api';
import { DialogService } from 'primeng/dynamicdialog';
import { Table } from 'primeng/table';
import { forkJoin } from 'rxjs';
import { Hero } from 'src/app/dto/hero';
import { Team } from 'src/app/dto/team';
import { MarvelService } from '../../../services/marvel.service';
import { AddHeroComponent } from '../../dialog/add-hero/add-hero.component';
import { HeroDetailComponent } from '../hero-detail/hero-detail.component';
@Component({
  selector: 'app-hero-table',
  templateUrl: './hero-table.component.html',
  styleUrls: ['./hero-table.component.css'],
  providers: [DialogService, ConfirmationService, MessageService]
})
export class HeroTableComponent implements OnInit {

  listHeroes: Hero[] = [];
  cols: any[] = [];
  loading: boolean = true;
  listHeroesFinal: Hero[] = [];
  virtualDatabase: Hero[] = [];
  allheroes = [];
  totalHeroes: number = 0;
  infoTeam: Team = new Team();
  noAddNewMembers: boolean = false;
  @ViewChild('dt') dt: Table | undefined;
  constructor(private mService: MarvelService, public dialogService: DialogService,
    private confirmationService: ConfirmationService, private messageService: MessageService,
  ) { }

  ngOnInit(): void {
    let infoJson = localStorage.getItem('team');
    this.infoTeam = infoJson !== null ? JSON.parse(infoJson) : new Team();
    console.log("infoteam", this.infoTeam)
    if(this.infoTeam.heroes.length === 6){
      this.noAddNewMembers = true;
    }
    this.loadHeros();
    this.cols = [
      { field: 'name', header: 'Name', width: '15%' },
      { field: 'description', header: 'Description', width: '75%' },
      { field: 'actions', header: 'Actions', width: '10%' },
    ]
  }

  applyFilterGlobal($event: any, stringVal: string) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  loadHeros() {
    this.loading = true;
    this.listHeroes = []
    var concatArrays: any[] = [];
    this.mService.getHeroesLength().subscribe(total => {
      this.totalHeroes = total;
      let offsetS: number = 0;
      let divisor = Math.trunc(this.totalHeroes / 100);
      const allObservables = []
      for (let i = 0; i <= divisor; i++) {
        allObservables.push(this.mService.getHeroes(offsetS, 100));
        offsetS += 100;
      }
      forkJoin(allObservables).subscribe(allObservablesResponse => {
        allObservablesResponse.forEach(oneObservableRespne => {
          concatArrays = concatArrays.concat(oneObservableRespne);
        })
        this.listHeroesFinal = concatArrays;
        console.log("concat", concatArrays)
      })

      this.loading = false;
    })

  }

  showDetail(idHero: number) {
    const ref = this.dialogService.open(HeroDetailComponent, {
      header: 'Hero Detail',
      width: '70%',
      data: {
        id: idHero
      },
    });
  }

  addTeam(idHero: number, nameHero: string) {
    this.confirmationService.confirm({
      header: 'Add Hero to your team',
      message: 'Are you sure that you want to add ' + nameHero + ' to ' + this.infoTeam.name + '?',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.messageService.add({ severity: 'info', summary: 'Confirmed', detail: nameHero + ' has joined the avengers' });
        this.mService.getHeroDetail(idHero).subscribe(hero => {
          let heroToAdd: Hero = new Hero();
          heroToAdd.name = hero[0].name;
          heroToAdd.id = hero[0].id;
          heroToAdd.description = hero[0].description;
          heroToAdd.imageUrl = hero[0].thumbnail.path + '.' + hero[0].thumbnail.extension;
          this.infoTeam.heroes.push(heroToAdd);
          localStorage.setItem('team', JSON.stringify(this.infoTeam));
          let dato = localStorage.getItem('team')
          console.log(dato);
          if(this.infoTeam.heroes.length === 6){
            this.noAddNewMembers = true;
          }
        })

      },
    });
  }
}
