import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { ActivatedRoute, Router, NavigationExtras } from "@angular/router";

@Component({
  selector: 'app-reservations',
  templateUrl: './reservations.component.html',
  styleUrls: ['./reservations.component.css']
})
export class ReservationsComponent implements OnInit {
  reservations: any;
  idPersonne!: number;
  infoPersonne: any;
  personneReservations: any;

  constructor(private http: HttpClient, private router: Router, private route: ActivatedRoute) {
    // Récupérer les paramètres de requête directement dans le constructeur
    this.route.queryParams.subscribe(params => {
      if (params['data']) {
        this.infoPersonne = JSON.parse(params['data']);
        this.idPersonne = this.infoPersonne.id;
      }
    });
  }

  ngOnInit() {
    // Utiliser idPersonne pour récupérer les réservations
    if (this.idPersonne) {
      this.http.get("http://localhost:9998/reservations-service/Reservations/idPersonne/" + this.idPersonne)
        .subscribe({
          next: data => {
            this.personneReservations = data;
          },
          error: err => {
            console.log('Error:', err);
          }
        });
    }
  }
}
