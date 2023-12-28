import {APP_INITIALIZER, NgModule} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';


import { AppComponent } from './app.component';
import { PersonnesComponent } from './personnes/personnes.component';
import { ReservationsComponent } from './reservations/reservations.component';
import { RessourcesComponent } from './ressources/ressources.component';
import {HttpClientModule} from "@angular/common/http";
import {AppRoutingModule} from "./app-routing.module";
import {RouterModule, Routes} from "@angular/router";
import {KeycloakAngularModule, KeycloakService} from "keycloak-angular";
import {AuthGuard} from "./guards/auth.guard";
const routes: Routes = [
  { path: 'ressources', component: RessourcesComponent },
  { path: 'personnes', component: PersonnesComponent , canActivate:[AuthGuard], data : { roles:['USER'] }},
  { path: 'reservations', component: ReservationsComponent },
];


function initializeKeycloak(keycloak: KeycloakService) {
  return () =>
    keycloak.init({
      config: {
        url: 'http://localhost:8080',
        realm: 'sdia-realm',
        clientId: 'reservation-web-client'
      },
      initOptions: {
        onLoad: 'check-sso',
        silentCheckSsoRedirectUri:
          window.location.origin + '/assets/silent-check-sso.html'
      }
    });
}
@NgModule({
  declarations: [
    AppComponent,
    PersonnesComponent,
    ReservationsComponent,
    RessourcesComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    RouterModule.forRoot(routes),
    KeycloakAngularModule

  ],
  exports:[RouterModule],
  providers: [{provide : APP_INITIALIZER, deps : [KeycloakService],useFactory : initializeKeycloak, multi : true}],
  bootstrap: [AppComponent]
})
export class AppModule{ }





















