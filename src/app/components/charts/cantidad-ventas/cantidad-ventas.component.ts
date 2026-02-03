import { Component, OnInit } from '@angular/core';
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { IonLabel } from "@ionic/angular/standalone";
import { Color,ScaleType  } from '@swimlane/ngx-charts';
import { Input } from '@angular/core';

@Component({
  selector: 'cantidad-ventas',
  templateUrl: './cantidad-ventas.component.html',
  styleUrls: ['./cantidad-ventas.component.scss'],
  standalone: true,
  imports: [IonLabel, NgxChartsModule],
})
export class CantidadVentasComponent  implements OnInit {
  @Input() title: string = 'Cantidad de Ventas';
  @Input() startColor: string = 'Cantidad de Ventas';
  @Input() data?: any[];

  view:[number, number] = [100,150];

  // options
  showLegend = true;
  gradient = false;
  showLabels = true;
  isDoughnut = false;

  colorScheme: Color = {
    name: 'custom', // Nombre del esquema de color
    selectable: true, // Si se puede seleccionar
    group: ScaleType.Ordinal, // Grupo de colores
    domain: ['#1dc9ac'], // Colores en formato hexadecimal
  };

  constructor() { }

  ngOnInit() {
    console.log(this.data)
  }

}
