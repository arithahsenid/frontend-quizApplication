import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';  // Added missing import

const BASIC_URL = "http://localhost:8080/";  // Added space around =

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http: HttpClient) { }  // Fixed constructor formatting

  // Moved method outside constructor and fixed syntax
  register(data: any): Observable<any> {  // Added parameter type
    return this.http.post(BASIC_URL + "api/auth/signup", data);  // Fixed URL concatenation and typo
  }

    // Moved method outside constructor and fixed syntax
    login(loginRequest: any): Observable<any> {  // Added parameter type
      return this.http.post(BASIC_URL + "api/auth/login", loginRequest);  // Fixed URL concatenation and typo
    }
  } 


