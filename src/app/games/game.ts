import { GoldGame } from "./gold.game";
import { ScavengerHuntGame } from "./scavenger-hunt.game";

export interface GameI {
    name: string;
}

export class Games {
   static games = [new GoldGame(), new ScavengerHuntGame]
}