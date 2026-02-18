import { Component, OnInit, Input, input } from '@angular/core';
import { CommonModule, NgIf } from '@angular/common';
import { IonCard, IonCardTitle, IonCardHeader, IonCardContent, IonThumbnail, IonCol, IonRow, IonChip } from "@ionic/angular/standalone";

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  standalone:true,
  imports: [IonChip, IonRow, IonCol, IonCard, IonThumbnail, NgIf],
})
export class ProductCardComponent  implements OnInit {
  @Input() product:any;
  @Input() hover?:boolean;
  @Input() wave?:boolean;
  @Input() noImg?:boolean;
  @Input() showDisponible?:boolean;
  @Input() showPriceBs?:boolean;
  @Input() showPriceUsd?:boolean;
  @Input() hidePrice?:boolean;
  
  constructor() { }

  ngOnInit() {}

}
