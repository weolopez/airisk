import { Component } from "@angular/core";
import { GoldGame } from "./gold/gold.game";
import { ScavengerHuntGame } from "./scavenger-hunt.game";
import { DecaturWarGame } from "./decatur-war/decatur-war.component";

export interface GameI {
  id: string;
  name: string;
  description: string;

  features: Array<{
    type: string;
    geometry: {
      type: string;
      coordinates: Array<number>;
      radius?: number;
    };
    properties: {
      name: string;
      address: string;
      description: string;
      image: string;
      website: string;
      phone: string;
    };
  }>;
  isGameOver(playerLocation: [number,number]) :any;
}

export class Games {
   static games = [new GoldGame(), new ScavengerHuntGame(), new DecaturWarGame()]
}