import { RouterModule, Routes } from "@angular/router";
import { GamesComponent } from "./pages/games/games.component";
import { NgModule } from "@angular/core";
import { GoldGame } from "./games/gold/gold.game";
import { DecaturWarGame } from "./games/decatur-war/decatur-war.component";
import { CardGame } from "./games/card/card.game";

const routes: Routes = [
  { path: 'CardGame', component: CardGame },
  { path: 'GoldGame', component: GoldGame },
  { path: 'DecaturWar', component: DecaturWarGame },
  { path: 'games', component: GamesComponent },
  { path: 'games/:game', component: GamesComponent },
  { path: '', redirectTo: '/games', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
