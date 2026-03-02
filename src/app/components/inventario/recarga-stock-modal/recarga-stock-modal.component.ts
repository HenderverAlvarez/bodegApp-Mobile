import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { InventarioService } from 'src/app/services/inventario_service';
import { trashBin, pencil, cog, bagAdd } from 'ionicons/icons';
import { ProductCardComponent } from 'src/app/components/commons/product-card/product-card.component';
import { addIcons } from 'ionicons';
import { ModalController } from '@ionic/angular';


@Component({
  selector: 'recarga-stock-modal',
  templateUrl: './recarga-stock-modal.component.html',
  styleUrls: ['./recarga-stock-modal.component.scss'],
  standalone:true,
  imports: [CommonModule, IonicModule, ProductCardComponent]
})
export class RecargaStockModalComponent  implements OnInit {

  constructor() { }

  ngOnInit() {}

}
