import { Component, OnInit } from '@angular/core';
import { HttpClient } from "@angular/common/http";
import { NavigationExtras, Router } from "@angular/router";

@Component({
  selector: 'app-personnes',
  templateUrl: './personnes.component.html',
  styleUrls: ['./personnes.component.css']
})
export class PersonnesComponent implements OnInit {
  personnes: any;
  infoPersonne: any;

  constructor(private http: HttpClient, private router: Router) {}

  ngOnInit() {
    this.http.get("http://localhost:9998/reservations-service/Personnes")
      .subscribe({
        next: value => {
          this.personnes = value;
        },
        error: err => {
          console.log(err);
        }
      });
  }

  getReservations(p: any) {
    const navigationExtras: NavigationExtras = {
      queryParams: {
        data: JSON.stringify(p),
      },
    };

    //la méthode navigate pour naviguer avec les paramètres de requête
    this.router.navigate(['/reservations'], navigationExtras);
  }
}
