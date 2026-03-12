import { Component, OnInit, Input } from '@angular/core';
import { RefresherCustomEvent } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { funnel, funnelOutline, add, addOutline, addCircle, chevronDownOutline, chevronForwardOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Router } from '@angular/router';
import { VentasService } from 'src/app/services/ventas_service';
import { HttpClientModule } from '@angular/common/http';
import { DatePipe } from '@angular/common';
import { IonicModule } from "@ionic/angular";
import { CardVentaComponent } from '../card-venta/card-venta.component';
import { CommonService } from 'src/app/services/common_service';

@Component({
  selector: 'ventas-info',
  templateUrl: './ventas-info.component.html',
  styleUrls: ['./ventas-info.component.scss'],
  standalone: true,
  imports: [DatePipe,CardVentaComponent, IonicModule, CommonModule, HttpClientModule]
})
export class VentasInfoComponent  implements OnInit {

  constructor(private router : Router, private ventasSvc: VentasService, private commonService: CommonService) { 
    addIcons({addCircle,funnelOutline,chevronForwardOutline,chevronDownOutline,addOutline,add,funnel});
  }
  @Input() ventasData: any[]= [];
  loading: boolean = false;

  ngOnInit() {
    this.getVentas()
  }

  async getVentas(event?:RefresherCustomEvent){
    this.loading = true;
    this.ventasSvc.getVentasDia().subscribe(
      (res:any)=>{
        this.loading = false;
        if(event){
          event.target.complete();
        }
        if(res.status_code == 200){
          this.ventasData = res.data
        }
      },
      (error:any)=>{
        this.loading = false;
        if(event){
          event.target.complete();
        }
        if(error.status== 401){
          this.commonService.closeSesionByToken();
        }
      })
      
  }
  
  navigate(url: string){
    this.router.navigateByUrl(url);
  }
}
