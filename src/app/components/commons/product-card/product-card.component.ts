import { Component, OnInit, Input, input } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { IonCard, IonCardTitle, IonCardHeader, IonCardContent, IonThumbnail, IonCol, IonRow } from "@ionic/angular/standalone";

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  standalone:true,
  imports: [IonRow, IonCol, IonCard, IonThumbnail, NgIf],
})
export class ProductCardComponent  implements OnInit {
  @Input() product:any;
  @Input() hover?:boolean;
  @Input() wave?:boolean;
  @Input() noImg?:boolean;
  

  constructor() { }

  ngOnInit() {}

}
