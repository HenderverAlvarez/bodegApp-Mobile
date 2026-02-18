import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonRow, IonGrid, IonCol, IonChip, IonIcon, IonSearchbar, IonLabel, IonList, IonItem, IonSelect, IonSelectOption, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonSpinner, IonRefresherContent, IonRefresher } from '@ionic/angular/standalone';
import { AppHeaderComponent } from 'src/app/components/commons/app-header/app-header.component';
import { arrowBack, menu, funnel, funnelOutline } from 'ionicons/icons';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { CardVentaComponent } from 'src/app/components/ventas/card-venta/card-venta.component';
import { VentasService } from 'src/app/services/ventas_service';
import { HttpClientModule } from '@angular/common/http';
import { RefresherCustomEvent } from '@ionic/core';


@Component({
  selector: 'app-ventas-lista',
  templateUrl: './ventas-lista.page.html',
  styleUrls: ['./ventas-lista.page.scss'],
  standalone: true,
  imports: [IonRefresher, IonRefresherContent, IonSpinner, IonCard, CardVentaComponent, IonCardHeader, IonCardTitle, IonCardContent, IonItem, IonSelect, IonSelectOption, IonList, IonLabel, HttpClientModule, IonSearchbar, CardVentaComponent, IonIcon, IonChip, IonCol, IonGrid, IonRow, IonContent, RouterLink, CommonModule, FormsModule, AppHeaderComponent]
})
export class VentasListaPage implements OnInit {

  constructor(private ventasSvc:VentasService) {
    addIcons({arrowBack,funnel,menu, funnelOutline});
  }
  customActionSheetOptions = {
    
  };

  ventas:any[]=[]
  showFilters:boolean = false;
  selectedDate:string = '';
  selectedStatus:string = '';
  selectedEstado:string = '';
  search:string = '';
  params:string = '';
  url:string = '?limit=10&page=1';
  loading:boolean = false;
  
  ngOnInit() {
  }

  handleSearch($event:any){

    this.search = $event.detail.value;
    this.getVentas();
  }

  filter(event: { type: string; value: any }) {
    // Asignar el valor seleccionado según el tipo de evento
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
        default:
            console.warn(`Tipo de evento desconocido: ${event.type}`);
            return; // Salir si el tipo de evento no es reconocido
    }

    let url = this.url;
    const paramName = event.type; // Usar el tipo de evento como el nombre del parámetro
    const formattedValue = event.value === false ? '' : encodeURIComponent(String(event.value).trim());

    // Si el valor está vacío, eliminar el parámetro de la URL
    if (formattedValue === '') {
        const regex = new RegExp(`[?&]${paramName}=[^&]*(&|$)`);
        url = url.replace(regex, (match, p1) => {
            return p1 === '&' ? '' : ''; // Eliminar el parámetro
        });

        // Limpiar la URL si no quedan parámetros
        if (url.endsWith('?') || url.endsWith('&')) {
            url = url.slice(0, -1);
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

    this.url = url;
    this.getVentas();
}


  getVentas(event?:RefresherCustomEvent){
    this.loading = true;
    this.ventasSvc.getVentasFiltros(this.url).subscribe({
      next:(res:any)=>{
        if(event){
          event.target.complete();
        }
        this.ventas = res.data;
        this.loading = false;
      },
      error:(err:any)=>{
        this.ventas = [];
        this.loading = false;
        if(event){
          event.target.complete();
        }
        console.log('Error al obtener las ventas', err);
      }
    });
  }

  ionViewWillEnter(){
    this.getVentas();
  }

  ionViewWillLeave(){
    this.url="";
    this.ventas=[];
    this.loading=false;
  }

  showHideFilters(){
    this.showFilters = !this.showFilters;
  }
}
