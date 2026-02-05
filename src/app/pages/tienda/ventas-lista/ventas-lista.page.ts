import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonRow, IonGrid, IonCol, IonChip, IonIcon, IonSearchbar, IonLabel, IonList, IonItem, IonSelect, IonSelectOption, IonCardContent, IonCardTitle, IonCardHeader, IonCard } from '@ionic/angular/standalone';
import { AppHeaderComponent } from 'src/app/components/commons/app-header/app-header.component';
import { arrowBack, menu, funnel, funnelOutline } from 'ionicons/icons';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { CardVentaComponent } from 'src/app/components/ventas/card-venta/card-venta.component';
import { VentasService } from 'src/app/services/ventas_service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-ventas-lista',
  templateUrl: './ventas-lista.page.html',
  styleUrls: ['./ventas-lista.page.scss'],
  standalone: true,
  imports: [IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonSelect, IonSelectOption, IonList, IonLabel, HttpClientModule, IonSearchbar, CardVentaComponent, IonIcon, IonChip, IonCol, IonGrid, IonRow, IonContent, RouterLink, CommonModule, FormsModule, AppHeaderComponent]
})
export class VentasListaPage implements OnInit {

  constructor(private ventasSvc:VentasService) {
    addIcons({arrowBack,funnel,menu, funnelOutline});
  }

  ventas:any[]=[]
  showFilters:boolean = false;
  selectedDate:string = '';
  selectedStatus:string = '';
  selectedEstado:string = '';
  search:string = '';
  params:string = '';
  url:string = '?limit=10&page=1';

  ngOnInit() {
  }

  handleSearch($event:any){

    this.search = $event.detail.value;
    this.getVentas();
  }

  filter(event: { type: string; value: any }) {
    switch (event.type) {
      case 'estado':
        this.selectedEstado = event.value;
        break;
      case 'search':
        this.selectedStatus = event.value;
        break;
      case 'time':
        this.selectedDate = event.value;
        break;
    }

    let url = this.url;
    const paramName = event.type; // Usar el tipo de evento como el nombre del parámetro

    // Formatear el valor para la URL
    if (event.value === false) {
      event.value = '';
    }
    event.value = String(event.value);
    const formattedValue = encodeURIComponent(event.value.trim());

    if (formattedValue === '') {
      // Crear una expresión regular para buscar y eliminar el parámetro
      const regex = new RegExp(`[?&]${paramName}=[^&]*(&|$)`);
      url = url.replace(regex, (match, p1) => {
        // Si el parámetro está al final de la URL, eliminarlo
        return p1 === '&' ? '' : '';
      });

      // Eliminar el signo de interrogación si no quedan parámetros
      if (url.endsWith('?')) {
        url = url.slice(0, -1);
      }
      if (url.endsWith('&')) {
        url = url.slice(0, -1);
      }

      // Cambiar `?` por `&` si es el primer parámetro eliminado
      if (url.includes('?') && !url.includes('&')) {
        url = url.replace('?', '&');
      }

    } else {
      // Crear una expresión regular para buscar el parámetro
      const regex = new RegExp(`[?&]${paramName}=[^&]*`);

      // Reemplazar el parámetro si existe
      if (regex.test(url)) {
        url = url.replace(regex, (match) => {
          return match.startsWith('?')
            ? `?${paramName}=${formattedValue}`
            : `&${paramName}=${formattedValue}`;
        });
      } else {
        // Agregar el nuevo parámetro
        const separator = url.includes('?') ? '&' : '?';
        url += separator + `${paramName}=${formattedValue}`;
      }
    }

    this.url=url;
    this.getVentas();
  }

  getVentas(){
    
    console.log(this.url);
    this.ventasSvc.getVentasFiltros(this.url).subscribe({
      next:(res:any)=>{
        this.ventas = res.data;
      },
      error:(err:any)=>{
        console.log('Error al obtener las ventas', err);
      }
    });
  }

  ionViewWillEnter(){
    this.getVentas();
  }

  ionViewWillLeave(){
    this.url="";
  }

  showHideFilters(){
    this.showFilters = !this.showFilters;
  }
}
