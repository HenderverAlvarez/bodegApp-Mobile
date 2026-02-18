import { Component, OnInit, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonCard, IonCol, IonRow, IonChip } from "@ionic/angular/standalone";

@Component({
  selector: 'product-card',
  templateUrl: './product-card.component.html',
  styleUrls: ['./product-card.component.scss'],
  standalone:true,
  imports: [IonChip, IonRow, IonCol, IonCard, CommonModule],
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
  @Input() hideCantidad?:boolean;
  
  constructor() { }

  ngOnInit() {}

}
