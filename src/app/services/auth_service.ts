import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { LoginPage } from 'src/app/pages/login/login.page';
import { jwtDecode } from "jwt-decode";

import { CommonService } from './common_service';


@Injectable({
  providedIn: 'any'
})

export class AuthService {

    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient, private commonService:CommonService) {}

    logIn(data:any){
        return this.http.post<any>(`${this.apiUrl}/login/login_user`, data);
    }
    register(data:any){
        return this.http.post<any>(`${this.apiUrl}/login/register`, data);
    }


    async checkToken(): Promise<boolean> {
        const token = await this.commonService.getLocalStorage('token');
        if (!token) {
            return false; // No hay token, no autenticado
        }

        let decoded = jwtDecode(token);
        if(decoded.exp === undefined){
            return false; // Token no válido
        }
        const isExpired = decoded.exp < Date.now() / 1000;
        if (isExpired) {
            return false;
        }
        return true; // Token válido
    }

}