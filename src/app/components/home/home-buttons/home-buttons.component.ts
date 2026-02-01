import { Component, OnInit } from '@angular/core';
import { IonRow, IonCol, IonCardContent, IonCard, IonAccordionGroup, IonItem, IonAccordion, IonLabel } from "@ionic/angular/standalone";
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CantidadVentasComponent } from '../../charts/cantidad-ventas/cantidad-ventas.component';

@Component({
  standalone: true,
  imports: [IonLabel, IonAccordion, IonItem, IonAccordionGroup, IonCard, IonCardContent, IonRow, IonCol, NgxChartsModule,CantidadVentasComponent],
  selector: 'home-buttons',
  templateUrl: './home-buttons.component.html',
  styleUrls: ['./home-buttons.component.scss'],
})
export class HomeButtonsComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
