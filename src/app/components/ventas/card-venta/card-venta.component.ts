import { DatePipe } from '@angular/common';
import { Component, OnInit, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'card-venta',
  templateUrl: './card-venta.component.html',
  styleUrls: ['./card-venta.component.scss'],
  standalone: true,
  imports: [IonicModule, DatePipe, CommonModule]
})
export class CardVentaComponent  implements OnInit {

  @Input() venta:any;
  constructor() { }

  ngOnInit() {}

}
