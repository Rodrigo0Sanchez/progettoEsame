import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import * as bcrypt from 'bcryptjs';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  salt: string;
  loggedin: boolean = false;
  baseUrl = `https://3000-bronze-jaguar-c686i5wg.ws-eu03.gitpod.io/`;

  constructor(private http: HttpClient) { }

  getSalt(): void {
   this.salt = '$2a$10$WSVz1hrhWgKTq4NhpVqA2e';
  }

  setLoginStatus(status: boolean) {
    this.loggedin = status;
  }

  getToken() {
    return !!localStorage.getItem("token");
  }

  login(username: string, password: string) {
    let url = `${this.baseUrl}login/`;

    const myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    let body = new HttpParams();
    body = body.set('username', username);

    let content = this.http.post(url, body, { headers: myheader });

    return content;
  }

  register(username: string, password: string) {
    let pwd = bcrypt.hashSync(password, this.salt);
    let url = `${this.baseUrl}register/`;

    const myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    let body = new HttpParams();
    body = body.set('username', username);
    body = body.set('pwd', pwd);

    let content = this.http.post(url, body, { headers: myheader }); // result can be "done" or "existing_user"

    return content;
  }

  addPet(pet: any) {
    let url = `${this.baseUrl}addPet/`;

    const myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    let body = new HttpParams();
    body = body.set('username', localStorage.getItem('token'));
    body = body.set('name', pet.name);
    body = body.set('weight', pet.weight);
    body = body.set('color', pet.color);
    body = body.set('eyesColor', pet.eyesColor);
    body = body.set('age', pet.age);
    body = body.set('pic', pet.image);

    let content = this.http.post(url, body, { headers: myheader }); // result can be "done" or "existing"

    return content;
  }

  getData(username: string) {
    let url = `${this.baseUrl}getUserData/`;
    const myheader = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
    let body = new HttpParams();
    body = body.set('username', username);

    let content = this.http.post(url, body, { headers: myheader });

    return content;
  }

  public uploadImage(image: File): Observable<Response> {
    const formData = new FormData();

    formData.append('image', image);

    return ;
  }

}
