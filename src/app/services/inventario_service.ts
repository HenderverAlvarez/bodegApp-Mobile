import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';


@Injectable({
  providedIn: 'any'
})

export class InventarioService {

    private apiUrl = environment.apiUrl+'/inventario';

    constructor(private http: HttpClient) {}

    getHeaders(){
      const token = localStorage.getItem('token'); // Obtener el token del localStorage
      return new HttpHeaders({
        'Authorization': `Bearer ${token}`, // Agrega el token Bearer en el header
        'Content-Type': 'application/json' // Asegúrate de establecer el tipo de contenido
      });
    }


    insertProducto(data:any): Observable<any>{
        let headers = this.getHeaders();
        return this.http.post<any>(`${this.apiUrl}/insert`, data, { headers });
    }

    getItems(page:number, search?:string){
      let headers = this.getHeaders();
      let url = `${this.apiUrl}/get_by_tienda?limit=10&page=${page}`
      if(search && search != ''){
        url = url + `&search=${search}`
      }
      return this.http.get<any>(url, { headers });
    }

    getItemsInfo(page:number, search?:string){
      let headers = this.getHeaders();
      let url = `${this.apiUrl}/get_items_info?limit=5&page=${page}`
      if(search && search != ''){
        url = url + `&search=${search}`
      }
      return this.http.get<any>(url, { headers });
    }
}