import { Component } from "@angular/core";
import { GoldGame } from "./gold/gold.game";
import { ScavengerHuntGame } from "./scavenger-hunt.game";

export interface GameI {
  gameOver(): unknown;
  id: string;
  name: string;
  description: string;

  features: Array<{
    type: string;
    geometry: {
      type: string;
      coordinates: Array<number>;
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
  isGameOver(): boolean;
}

export class Games {
   static games = [new GoldGame(), new ScavengerHuntGame()]
}