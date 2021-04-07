import { Component, OnInit } from '@angular/core';
import { ApiService } from './api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'PetBase';
  loggedin: boolean;
  rnd;
  src;
  logos = ['logo.png', 'logoBrutto.png']

  constructor(private api: ApiService) { }

    ngOnInit(): void {
      this.rnd = Math.round(Math.random());
      this.src = `/assets/images/${this.logos[this.rnd]}`;
        if(this.api.getToken()){
        this.api.setLoginStatus(true);
        }
        this.api.getSalt();
        this.refreshLogStatus();
    }

  public refreshLogStatus(): void {
    this.loggedin = this.api.loggedin;
  }

  logOut(): void{
    localStorage.removeItem('token');
  }

  a = setInterval(() => { this.refreshLogStatus() }, 1000);

}
