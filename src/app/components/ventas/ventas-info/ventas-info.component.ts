import { Component, OnInit } from '@angular/core';
import { IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonLabel, IonChip, IonIcon, IonRefresher, IonRefresherContent } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { funnel, funnelOutline, add, addOutline, addCircle, chevronDownOutline, chevronForwardOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Router } from '@angular/router';

@Component({
  selector: 'ventas-info',
  templateUrl: './ventas-info.component.html',
  styleUrls: ['./ventas-info.component.scss'],
  standalone: true,
  imports: [IonRefresherContent, IonRefresher, IonIcon, IonChip, IonLabel, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonCol, IonRow, IonGrid,CommonModule, ]
})
export class VentasInfoComponent  implements OnInit {

  constructor(private router : Router) { 
    addIcons({addCircle,funnelOutline,chevronForwardOutline,chevronDownOutline,addOutline,add,funnel});
  }
  ventasData: any[]= [
    {
      uuid: "3as2d1a",
      fecha: "2024-06-01 4:15PM",
      total: 150.75,
      estado: "Pagada",
      total_usd: "4",
      mora: false,
      items: 4
    },
    {
      uuid: "3as2d1a",
      fecha: "2024-06-01 4:15PM",
      total: 150.75,
      estado: "Pendiente",
      total_usd: "4",
      mora: true,
      cliente: "Juan Perez",
      items: 2
    },
    {
      uuid: "3as2d1a",
      fecha: "2024-06-01 4:15PM",
      total: 150.75,
      estado: "Pagada",
      total_usd: "4",
      mora: false,
      items: 1
    },    
  ];
  loading: boolean = false;

  ngOnInit() {}

  navigate(url: string){
    this.router.navigateByUrl(url);

  }
}
