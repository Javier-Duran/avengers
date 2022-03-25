
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { Hero } from 'src/app/dto/hero';
import { MarvelService } from 'src/app/services/marvel.service';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.css']
})
export class HeroDetailComponent implements OnInit {
  id: number = 0;
  hero: Hero = new Hero();
  listHeroComics = []
  constructor(private mService: MarvelService, private route: ActivatedRoute,
    public ref: DynamicDialogRef, public config: DynamicDialogConfig) {
    this.id = this.config.data.id;
    console.log("id", this.id)
    this.mService.getHeroDetail(this.id).subscribe(heroInfi => {
      console.log("heroInfo", heroInfi[0].comics)
      this.hero.name = heroInfi[0].name;
      this.hero.id = heroInfi[0].id;
      this.hero.description = heroInfi[0].description;
      this.hero.imageUrl = heroInfi[0].thumbnail.path + '.' + heroInfi[0].thumbnail.extension
      this.mService.getHeroComic(this.id).subscribe(heroComics => {
        console.log("hero comics", heroComics)
        this.hero.comics = heroComics;
        this.listHeroComics = heroComics.data.results;
      })
    })
  }

  ngOnInit(): void {
  }



}
