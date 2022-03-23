import { Comics } from "./comics";

export interface Hero {
    name: string;
    description: string;
    comics: Comics[];
    powers: string;
    img_url ?: string;
}
