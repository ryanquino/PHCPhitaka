import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse, HttpParams, HttpHeaders } from '@angular/common/http';
import { SessionStorage, SessionStorageService } from "ngx-webstorage";
import { Observable, throwError } from 'rxjs';
  ;
import { Blockchain } from 'src/app/models/blockchain/blockchain';
import { RegisterUser } from 'src/app/index/login/login.component';
import { UserProfile } from 'src/app/models/UserProfile';
import { AuthService } from 'src/app/services/auth/auth.service';
@Injectable({
  providedIn: 'root'
})
export class RegisterService {
  baseUrl = 'http://localhost/backend/api/';
  register: RegisterUser;
  
  constructor(
    private http: HttpClient,
    private auth: AuthService,
    private storage: SessionStorageService,) { }

  registerUsers(register: RegisterUser): Observable<RegisterUser>{
    return this.http.post<RegisterUser>(`${this.baseUrl}/insert.php`, register);   
  }


  private handleError(error: HttpErrorResponse) {
    console.log(error);
   
    // return an observable with a user friendly message
    return throwError('Error! something went wrong.');
  }

  public Login(username, password) {
    
    return new Promise((resolve, reject) => {
      
       this.auth.Authenticate(username, password).subscribe(
        response => {
          
          this.storage.clear();
          if (response.hasOwnProperty("id")) {
            this.storage.store("isValidUser", true);
            this.storage.store("userData", response);
            this.auth.isLoggedIn = true;
            resolve(true);
          } else {
            resolve(false);
          }
        },
        error => {
          
          console.log(error);

          this.storage.clear();
          
          reject(error);
        },
        () => { }
      )
    });

  }
  
}
