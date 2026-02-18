import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RefresherCustomEvent, IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonCol, IonLabel, IonSegment, IonSegmentButton, IonRow, IonSegmentView, IonSegmentContent, IonIcon, IonCard, IonCardHeader, IonCardContent, IonCardTitle, IonChip } from '@ionic/angular/standalone';
import { AppHeaderComponent } from 'src/app/components/commons/app-header/app-header.component';
import { VentasInfoComponent } from 'src/app/components/ventas/ventas-info/ventas-info.component';
import { VentasService } from 'src/app/services/ventas_service';
import { HttpClientModule } from '@angular/common/http';
import { addIcons } from 'ionicons';
import { arrowForwardCircleOutline, arrowBack } from 'ionicons/icons';
import { Router } from '@angular/router';

@Component({

  selector: 'app-tienda',
  templateUrl: './tienda.page.html',
  styleUrls: ['./tienda.page.scss'],
  standalone: true,
  imports: [IonChip, IonCardTitle, IonCardContent, IonCardHeader, IonCard, IonIcon, VentasInfoComponent, IonRow, IonSegmentButton, IonSegment, IonLabel, IonCol, IonGrid, IonContent, CommonModule, FormsModule, AppHeaderComponent, IonSegmentView, IonSegmentContent]
})
export class TiendaPage implements OnInit {

  constructor(private ventasSvc: VentasService, private router : Router ) { 
    addIcons({arrowForwardCircleOutline,arrowBack});
  }
  ventasData: any[]=[]
  showVenta: boolean = false;

  ngOnInit() {
    
  }



  showVentas(){
    this.showVenta = !this.showVenta;
  }

  ionViewWillExit(){
    this.showVenta = false;
  }
  navigate(url: string){
    this.router.navigateByUrl(url);
  }
}
