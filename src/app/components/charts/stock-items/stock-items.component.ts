import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { Color,ScaleType  } from '@swimlane/ngx-charts';

import { IonLabel } from "@ionic/angular/standalone";

@Component({
  selector: 'stock-items',
  templateUrl: './stock-items.component.html',
  styleUrls: ['./stock-items.component.scss'],
  standalone:true,
  imports: [IonLabel, NgxChartsModule]
})
export class StockItemsComponent  implements OnInit {
  single: any[] = [
    {
      "name": "Vendidos",
      "value": 80
    },
    {
      "name": "Stock",
      "value": 20
    },
  ];

  view:[number, number] = [200,300];

  // options
  showLegend = true;
  gradient = false;
  showLabels = true;
  isDoughnut = false;

  colorScheme: Color = {
    name: 'custom', // Nombre del esquema de color
    selectable: true, // Si se puede seleccionar
    group: ScaleType.Ordinal, // Grupo de colores
    domain: ['#1dc9ac', "#1a62d6"], // Colores en formato hexadecimal
  };

  constructor() { }

  ngOnInit() {}

}
