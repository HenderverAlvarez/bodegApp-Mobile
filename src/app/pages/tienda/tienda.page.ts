import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonCol, IonLabel, IonSegment, IonSegmentButton, IonRow, IonSegmentView, IonSegmentContent } from '@ionic/angular/standalone';
import { AppHeaderComponent } from 'src/app/components/commons/app-header/app-header.component';
import { VentasInfoComponent } from 'src/app/components/ventas/ventas-info/ventas-info.component';

@Component({

  selector: 'app-tienda',
  templateUrl: './tienda.page.html',
  styleUrls: ['./tienda.page.scss'],
  standalone: true,
  imports: [VentasInfoComponent, IonRow, IonSegmentButton, IonSegment, IonLabel, IonCol, IonGrid, IonContent, CommonModule, FormsModule, AppHeaderComponent, IonSegmentView, IonSegmentContent]
})
export class TiendaPage implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
