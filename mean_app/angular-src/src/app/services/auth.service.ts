import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';

@Injectable()
export class AuthService {

  authToken: any;
  user: any;

  constructor(private http: Http) { }

  // make post request
  // subscribe to observable that is going to register user in the back end
  // and send success data or not
  registerUser(user){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('users/register', user,{headers:headers})
      .map(res => res.json());
  }

  authenticateUser(user){
    // make a post req to authenticate
    // basically the same thing as above, just changing the endpoint
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.post('users/authenticate', user,{headers:headers})
      .map(res => res.json());
  }

  // need to send the token. therefore ...
  getProfile(){
    let headers = new Headers();
    this.loadToken();
    headers.append('Authorization', this.authToken);
    headers.append('Content-Type', 'application/json');
    return this.http.get('users/profile', {headers:headers})
      .map(res => res.json());
  }

  storeUserData(token, user){
    // key == id_token (becuase engular looks for this path automatic in local storage)
    localStorage.setItem('id_token', token);
    // The reason for JSON.stringyfy is becuase local storage can only store string not objects
    localStorage.setItem('user', JSON.stringify(user));
    this.authToken = token;
    this.user = user;
  }

  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  // From angular-jwt, checks if logged in.
  loggedIn(){
    return tokenNotExpired('id_token');
  }

  logout(){
    this.authToken = null;
    this.user = null;
    localStorage.clear();
  }

}
