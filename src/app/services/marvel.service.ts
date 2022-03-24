import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Hero } from "../dto/hero";
import { map } from 'rxjs/operators';
import { Md5 } from 'ts-md5/dist/md5';
@Injectable({
  providedIn: 'root'
})
export class MarvelService {

  url: string;
  apikeyPublic: string;
  apikeyPrivate: string;
  hash: any;
  md5 = new Md5();
  ts = '1';
  constructor(public http: HttpClient) {
    this.url = "https://gateway.marvel.com:443/v1/public/";
    this.apikeyPublic = "67bc8de48883899d54dbaba076591143";
    this.apikeyPrivate = "85ee720d55dd56e9a5a626f637d0885c702fabf2";
    this.hash = this.md5.appendStr(this.ts + this.apikeyPrivate + this.apikeyPublic).end();
    console.log('hash', this.hash)
  }
  // : Observable<Hero[]>
  getHeroes(offsetS: number, limit:number) {
    let url = this.url + 'characters?offset='+ offsetS+ '&limit='+limit+'&ts=1&apikey=' + this.apikeyPublic + '&hash=' + this.hash;
    return this.http.get<any>(url).pipe(map((resp: any) => resp.data.results));
  }

  getHeroesLength(){
    let url = this.url + 'characters?ts=1&apikey=' + this.apikeyPublic + '&hash=' + this.hash;
    return this.http.get<any>(url).pipe(map((resp: any) => resp.data.total));
  }

  getHeroDetail(id:number){
    let url = this.url + 'characters/'+id+'?ts=1&apikey=' + this.apikeyPublic + '&hash=' + this.hash;
    return this.http.get<any>(url).pipe(map((resp: any) => resp.data.results));
  }

  getHeroComic(id:number){
    let url = this.url + 'characters/'+id+'/comics?orderBy=focDate%2Ctitle&ts=1&apikey=' + this.apikeyPublic + '&hash=' + this.hash;
    return this.http.get<any>(url).pipe(map((resp: any) => resp));
  }
}