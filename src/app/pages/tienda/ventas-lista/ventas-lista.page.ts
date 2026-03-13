import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AppHeaderComponent } from 'src/app/components/commons/app-header/app-header.component';
import { arrowBack, menu, funnel, funnelOutline, chevronBack, chevronForward } from 'ionicons/icons';
import { RouterLink } from '@angular/router';
import { addIcons } from 'ionicons';
import { CardVentaComponent } from 'src/app/components/ventas/card-venta/card-venta.component';
import { VentasService } from 'src/app/services/ventas_service';
import { HttpClientModule } from '@angular/common/http';
import { RefresherCustomEvent } from '@ionic/core';
import { CommonService } from 'src/app/services/common_service';
import { IonicModule } from '@ionic/angular';

@Component({
  selector: 'app-ventas-lista',
  templateUrl: './ventas-lista.page.html',
  styleUrls: ['./ventas-lista.page.scss'],
  standalone: true,
  imports: [IonicModule, CardVentaComponent, HttpClientModule, CardVentaComponent, RouterLink, CommonModule, FormsModule, AppHeaderComponent]
})
export class VentasListaPage implements OnInit {

  constructor(private ventasSvc:VentasService, private commonService:CommonService) {
    addIcons({arrowBack,funnel,menu, funnelOutline, chevronBack, chevronForward});
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
  actualPage:number = 1;
  url:string = '?limit=10&page='+this.actualPage;
  loading:boolean = false;
  pages: number[] = Array(0).fill(0);

  
  ngOnInit() {
  }

  setPage(page:number){
    if(page < 1 || page > this.pages.length){
      return;
    }
    this.actualPage = page;
    this.url = this.url.replace(/page=\d+/, 'page=' + this.actualPage);
    this.getVentas();
  }
  nextPage(){
    if(this.actualPage < this.pages.length){
      this.actualPage++;
      this.url = this.url.replace(/page=\d+/, 'page=' + this.actualPage);
      this.getVentas();
    }
  }  
  prevPage(){
    if(this.actualPage > 1){
      this.actualPage--;
      this.url = this.url.replace(/page=\d+/, 'page=' + this.actualPage);
      this.getVentas();
    }
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
    this.ventas = [];
    this.ventasSvc.getVentasFiltros(this.url).subscribe({
      next:(res:any)=>{
        if(event){
          event.target.complete();
        }
        if(res.status_code == 200){
          this.ventas = res.data;
          this.pages = Array(res.total_pages).fill(0);
        }
        if(res.status_code == 401){
          this.commonService.closeSesionByToken();
        }
        
        this.loading = false;
      },
      error:(err:any)=>{
        this.ventas = [];
        this.loading = false;
        if(event){
          event.target.complete();
        }
        console.log('Error al obtener las ventas', err);
        if(err.status == 401){
          this.commonService.closeSesionByToken();
        }
      }
    });
  }

  goTo(url:string){
    this.commonService.navigateTo(url)
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
