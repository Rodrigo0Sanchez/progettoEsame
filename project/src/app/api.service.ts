import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { bcrypt } from 'bcrypt';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  salt: string;
  baseUrl = `https://3000-indigo-sailfish-67vhq2fd.ws-eu03.gitpod.io/`;

  constructor(private http: HttpClient) { }

  getSalt(): void {
   this.http.get('assets/salt.txt', { responseType: 'text' }).subscribe(data => this.salt = data);
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
    console.log(content);

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

}
