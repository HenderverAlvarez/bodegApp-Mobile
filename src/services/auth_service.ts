import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginPage } from 'src/app/pages/login/login.page';


@Injectable({
  providedIn: 'any'
})

export class AuthService {

    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    logIn(data:any){
        return this.http.post<any>(`${this.apiUrl}/login/login_user`, data);
    }

}