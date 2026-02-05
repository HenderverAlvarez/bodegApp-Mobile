import { Component, OnInit, Input } from '@angular/core';
import { RefresherCustomEvent, IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonLabel, IonChip, IonIcon, IonRefresher, IonRefresherContent } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { funnel, funnelOutline, add, addOutline, addCircle, chevronDownOutline, chevronForwardOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Router } from '@angular/router';
import { VentasService } from 'src/app/services/ventas_service';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { IonicModule } from "@ionic/angular";
@Component({
  selector: 'ventas-info',
  templateUrl: './ventas-info.component.html',
  styleUrls: ['./ventas-info.component.scss'],
  standalone: true,
  imports: [DatePipe, IonRefresherContent, IonRefresher, IonIcon, IonChip, IonLabel, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonCol, IonRow, IonGrid, CommonModule, HttpClientModule]
})
export class VentasInfoComponent  implements OnInit {

  constructor(private router : Router, private ventasSvc: VentasService) { 
    addIcons({addCircle,funnelOutline,chevronForwardOutline,chevronDownOutline,addOutline,add,funnel});
  }
  @Input() ventasData: any[]= [];
  loading: boolean = false;

  ngOnInit() {
  
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
  
  navigate(url: string){
    this.router.navigateByUrl(url);
  }
}
