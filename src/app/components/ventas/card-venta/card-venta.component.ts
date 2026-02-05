import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'card-venta',
  templateUrl: './card-venta.component.html',
  styleUrls: ['./card-venta.component.scss'],
})
export class CardVentaComponent  implements OnInit {

  @Input() venta:any;
  constructor() { }

  ngOnInit() {}

}
