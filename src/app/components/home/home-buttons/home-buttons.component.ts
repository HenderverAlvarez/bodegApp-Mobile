import { Component, OnInit } from '@angular/core';
import { IonRow, IonCol, IonCardContent, IonCard, IonAccordionGroup, IonItem, IonAccordion, IonLabel, IonButton } from "@ionic/angular/standalone";
import { NgxChartsModule } from '@swimlane/ngx-charts';
import { CantidadVentasComponent } from '../../charts/cantidad-ventas/cantidad-ventas.component';
import { StockItemsComponent } from '../../charts/stock-items/stock-items.component';
@Component({
  standalone: true,
  imports: [IonLabel, IonAccordion, IonItem, IonAccordionGroup, IonRow, IonCol, NgxChartsModule,CantidadVentasComponent, StockItemsComponent],
  selector: 'home-buttons',
  templateUrl: './home-buttons.component.html',
  styleUrls: ['./home-buttons.component.scss'],
})
export class HomeButtonsComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
