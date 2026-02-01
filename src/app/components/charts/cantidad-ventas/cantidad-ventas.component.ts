import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'cantidad-ventas',
  templateUrl: './cantidad-ventas.component.html',
  styleUrls: ['./cantidad-ventas.component.scss'],
  standalone: true,
  imports: [NgxChartsModule],
})
export class CantidadVentasComponent  implements OnInit {
  single: any[] = [
    {
      "name": "Ventas",
      "value": 89400
    },
    {
      "name": "Pedidos",
      "value": 50000
    },
  ];

  view: any[] = [100, 100];

  // options
  showLegend = true;
  gradient = false;
  showLabels = true;
  isDoughnut = false;

  colorScheme = {
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA'] // Cambia estos colores según sea necesario
  };

  constructor() { }

  ngOnInit() {}

}
