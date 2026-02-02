import { Component, OnInit } from '@angular/core';
import { IonGrid, IonRow, IonCol, IonCard, IonCardHeader, IonCardTitle, IonCardContent, IonLabel, IonChip, IonIcon } from "@ionic/angular/standalone";
import { CommonModule } from '@angular/common';
import { funnel, funnelOutline, add, addOutline, addCircle } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { Router } from '@angular/router';

@Component({
  selector: 'ventas-info',
  templateUrl: './ventas-info.component.html',
  styleUrls: ['./ventas-info.component.scss'],
  standalone: true,
  imports: [IonIcon, IonChip, IonLabel, IonCardContent, IonCardTitle, IonCardHeader, IonCard, IonCol, IonRow, IonGrid,CommonModule, ]
})
export class VentasInfoComponent  implements OnInit {

  constructor(private router : Router) { 
    addIcons({addCircle,funnelOutline,addOutline,add,funnel});
  }
  ventasData: any[]= [
    {
      uuid: "3as2d1a",
      fecha: "2024-06-01 4:15PM",
      total: 150.75,
      estado: "Completada",
      total_usd: "4",
      mora: false,
    },
    {
      uuid: "3as2d1a",
      fecha: "2024-06-01 4:15PM",
      total: 150.75,
      estado: "Pendiente",
      total_usd: "4",
      mora: true,
      cliente: "Juan Perez",
    },
    {
      uuid: "3as2d1a",
      fecha: "2024-06-01 4:15PM",
      total: 150.75,
      estado: "Completada",
      total_usd: "4",
      mora: false,
    },
    {
      uuid: "3as2d1a",
      fecha: "2024-06-01 4:15PM",
      total: 150.75,
      estado: "Completada",
      total_usd: "4",
      mora: false,
    },
    {
      uuid: "3as2d1a",
      fecha: "2024-06-01 4:15PM",
      total: 150.75,
      estado: "Completada",
      total_usd: "4",
      mora: false,
    },
    
  ];
  loading: boolean = false;

  ngOnInit() {}

  navigate(url: string){
    this.router.navigateByUrl(url);

  }
}
