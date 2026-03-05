import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CantidadVentasComponent } from '../../charts/cantidad-ventas/cantidad-ventas.component';
import { StockItemsComponent } from '../../charts/stock-items/stock-items.component';
import { IonicModule } from '@ionic/angular';
import { CommonService } from 'src/app/services/common_service';
import { HttpClientModule } from '@angular/common/http';
import { addCircle, analyticsOutline, bagAdd, barChart, barChartOutline, calendarNumberOutline, cash, statsChart, walletOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  standalone: true,
  imports: [ IonicModule, NgxChartsModule,CantidadVentasComponent, StockItemsComponent, HttpClientModule],
  selector: 'home-buttons',
  templateUrl: './home-buttons.component.html',
  styleUrls: ['./home-buttons.component.scss'],
})
export class HomeButtonsComponent  implements OnInit {
  date: string = new Intl.DateTimeFormat('en-GB').format(new Date());
  constructor(private commonService:CommonService) {
    addIcons({addCircle,walletOutline, analyticsOutline, calendarNumberOutline, barChart, cash, bagAdd, statsChart})
   }

  dataVentas: any[] = [];
  dataPedidos: any[] = [];

  ngOnInit() {
    this.getData();
  }

  getData(){
    this.dataPedidos=[
      {
        "name": "Pedidos",
        "value": 5180.00
      }
    ]
    this.dataVentas=[
      {
        "name": "Ventas",
        "value": 89400.00
      }
    ]
  }

  navigate(url:string){
    this.commonService.navigateTo(url);
  }

}
