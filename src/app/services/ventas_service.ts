import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'any'
})

export class VentasService {

    private apiUrl = environment.apiUrl;

    constructor(private http: HttpClient) {}

    getHeaders(){
      const token = localStorage.getItem('token'); // Obtener el token del localStorage
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`, // Agrega el token Bearer en el header
        'Content-Type': 'application/json' // Asegúrate de establecer el tipo de contenido
      });
    }

    insertVenta(data:any): Observable<any>{
        let headers = this.getHeaders();
        return this.http.post<any>(`${this.apiUrl}/ventas/insert`, data, { headers });
    }
    
    getVentasDia(): Observable<any>{
      let headers = this.getHeaders();
      return this.http.get<any>(`${this.apiUrl}/ventas/get_by_tienda/dia`, { headers });
    }

}