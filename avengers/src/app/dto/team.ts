import { Hero } from "./hero";

export interface Team {
    team_name: string;
    team_description: string;
    members: Hero[];
}
