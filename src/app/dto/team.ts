import { Hero } from 'src/app/dto/hero';


export class Team {
    name:string;
    description:string;
    heroes: Hero[];

    constructor(){
        this.name = "Default Team";
        this.description = "This is an unformed team";
        this.heroes = []
    }
}
