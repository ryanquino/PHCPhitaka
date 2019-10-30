import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';


@Injectable({
  providedIn: 'root',
})
export class AuthService {
  isLoggedIn = false;
  baseUrl = 'http://localhost/backend/api/';
  // store the URL so we can redirect after logging in
  redirectUrl: string;
  constructor(
    private http: HttpClient) { }


  logout(): void {
    this.isLoggedIn = false;
  }

  public Authenticate(username, password) {
    let apiOperation = "login.php";
    let httpUrl = this.baseUrl + apiOperation;
    let httpBody = {
      "username": username,
      "password": password
    };

    let httpOptions = {
      headers: new HttpHeaders({
        "Accept": "application/json",
        "Content-Type": "application/json"
      })
    };

    return this.http.post(httpUrl, httpBody, httpOptions);
  }
}