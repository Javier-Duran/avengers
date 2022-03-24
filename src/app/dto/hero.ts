import { Comic } from "./comic";

export class Hero {
    name: string;
    description: string;
    imageUrl?: string;
    comics: Comic[];
    id: number;

    constructor() {
        this.name = '';
        this.description = '';
        this.comics = [];
        this.id = 0;

    }
}

