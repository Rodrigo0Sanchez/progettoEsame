import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-pet-list',
  templateUrl: './pet-list.component.html',
  styleUrls: ['./pet-list.component.css']
})
export class PetListComponent implements OnInit {
  height = window.innerHeight;

  pets: any;

  constructor(private api: ApiService) { }

  ngOnInit(): void {
    this.api.getData(localStorage.getItem('token')).subscribe((data) => {
      this.pets = data;
      console.log(data);
    })
  }

}
