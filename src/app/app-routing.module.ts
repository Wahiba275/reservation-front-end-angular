import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {RessourcesComponent} from "./ressources/ressources.component";
import {PersonnesComponent} from "./personnes/personnes.component";
import {ReservationsComponent} from "./reservations/reservations.component";
import {AuthGuard} from "./guards/auth.guard";

const routes: Routes = [
  { path: 'ressources', component: RessourcesComponent },
  { path: 'personnes', component: PersonnesComponent , canActivate:[AuthGuard], data : { roles:['USER'] }},
  { path: 'reservations', component: ReservationsComponent },
];



@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule{ }
