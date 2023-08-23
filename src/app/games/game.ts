import { Component } from "@angular/core";
import { GoldGame } from "./gold/gold.game";
import { DecaturWarGame } from "./decatur-war/decatur-war.component";
import { CardGame } from "./card/card.game";
import { Risk } from "./risk/Game";

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
  isGameOver(playerLocation: any) :any;
}

export class Games {
   static games = [new GoldGame(), new CardGame(), new DecaturWarGame(), new Risk()]
}