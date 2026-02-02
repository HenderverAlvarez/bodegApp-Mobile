import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
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

  colorScheme = {
    domain: ['#039D45', '#26a828', '#40c543', '#1dc9ac'] // Cambia estos colores según sea necesario
  };

  constructor() { }

  ngOnInit() {}

}
