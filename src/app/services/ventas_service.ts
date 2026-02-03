import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';


@Injectable({
  providedIn: 'any'
})

export class AuthService {

    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    

}