import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RefresherCustomEvent, IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonCol, IonLabel, IonSegment, IonSegmentButton, IonRow, IonSegmentView, IonSegmentContent } from '@ionic/angular/standalone';
import { AppHeaderComponent } from 'src/app/components/commons/app-header/app-header.component';
import { VentasInfoComponent } from 'src/app/components/ventas/ventas-info/ventas-info.component';
import { VentasService } from 'src/app/services/ventas_service';
import { HttpClientModule } from '@angular/common/http';

@Component({

  selector: 'app-tienda',
  templateUrl: './tienda.page.html',
  styleUrls: ['./tienda.page.scss'],
  standalone: true,
  imports: [VentasInfoComponent, IonRow, IonSegmentButton, IonSegment, IonLabel, IonCol, IonGrid, IonContent, CommonModule, FormsModule, AppHeaderComponent, IonSegmentView, IonSegmentContent]
})
export class TiendaPage implements OnInit {

  constructor(private ventasSvc: VentasService) { }
  ventasData: any[]=[]

  ngOnInit() {
    this.getVentas();
  }

  async getVentas(event?:RefresherCustomEvent){
    this.ventasSvc.getVentasDia().subscribe(
      (res:any)=>{
        console.log(res)
        if(event){
          event.target.complete();
        }
        if(res.status_code == 200){
          this.ventasData = res.data
          
        }
      },
      (error:any)=>{
        if(event){
          event.target.complete();
        }
      })
      
  }

  async ionViewDidEnter(){
    console.log("entro")
    await this.getVentas();
  }

}
