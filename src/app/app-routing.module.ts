import { RouterModule, Routes } from "@angular/router";
import { GamesComponent } from "./pages/games/games.component";
import { NgModule } from "@angular/core";
import { GoldGame } from "./games/gold/gold.game";

const routes: Routes = [
  { path: 'GoldGame', component: GoldGame },
  { path: 'games', component: GamesComponent },
  { path: 'games/:game', component: GamesComponent },
  { path: '', redirectTo: '/games', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
