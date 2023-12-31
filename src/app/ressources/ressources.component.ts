import {Component, OnInit} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Router} from "@angular/router";

@Component({
  selector: 'app-ressources',
  templateUrl: './ressources.component.html',
  styleUrl: './ressources.component.css'
})
export class RessourcesComponent implements OnInit{
  ressources: any;
  constructor(private http:HttpClient) {}
  ngOnInit() {
    this.http.get("http://localhost:9998/resource-service/ressources")
      .subscribe({
        next: value => {
          this.ressources = value;
        },
        error: err => {
          console.log(err);
        }
      });
  }

}
