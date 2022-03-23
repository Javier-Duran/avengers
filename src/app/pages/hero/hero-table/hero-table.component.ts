import { Component, OnInit, ViewChild } from '@angular/core';
import { LazyLoadEvent } from 'primeng/api';
import { Table } from 'primeng/table';
import { Hero } from 'src/app/dto/hero';
import { MarvelService } from '../../../services/marvel.service';
@Component({
  selector: 'app-hero-table',
  templateUrl: './hero-table.component.html',
  styleUrls: ['./hero-table.component.css']
})
export class HeroTableComponent implements OnInit {

  listHeroes: Hero[] = [];
  cols: any[] = [];
  loading: boolean  = false;
  listHeroesFinal: Hero[]=[]
  totalHeroes: number = 0;
  @ViewChild('dt') dt: Table | undefined;
  constructor(private mService: MarvelService) { }

  ngOnInit(): void {
   
    this.loadHeros();
    this.cols = [
      { field: 'name', header: 'Name' },
      { field: 'description', header: 'Description' },
    ]
  }

  applyFilterGlobal($event: any, stringVal: string) {
    this.dt!.filterGlobal(($event.target as HTMLInputElement).value, stringVal);
  }

  loadHeros(){
    this.loading = true;
    this.mService.getHeroesLength().subscribe(total => {
      this.totalHeroes = total;

      let offsetS: number = 0;
      let divisor = Math.trunc(this.totalHeroes / 100);
      for (let i = 0; i <= divisor; i++) {
        this.mService.getHeroes(offsetS).subscribe(partHero => 
          partHero.forEach((element: Hero) => {
            this.listHeroes.push(element)
          })
        )
        offsetS = offsetS + 100
      }
      this.loading = false;
      
    })
    this.listHeroesFinal = this.listHeroes;
  }

}
