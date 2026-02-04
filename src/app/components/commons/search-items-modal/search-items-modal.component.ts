import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonIcon, IonRow, IonGrid, IonCol, IonSearchbar, IonSpinner, IonList, IonItem, IonLabel } from "@ionic/angular/standalone";
import { ModalController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { closeCircleOutline,closeCircle } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';


@Component({
  selector: 'app-search-items-modal',
  templateUrl: './search-items-modal.component.html',
  styleUrls: ['./search-items-modal.component.scss'],
  standalone: true,
  imports: [IonLabel, ProductCardComponent, IonItem, IonList, CommonModule, IonSpinner, IonSearchbar, IonCol, IonGrid, IonRow, IonIcon, IonContent, IonButtons, IonTitle, IonToolbar, IonHeader, ]
})
export class SearchItemsModalComponent  implements OnInit {
  @Output() dataSent = new EventEmitter<any>();
  constructor(private modalController: ModalController) {
    addIcons({closeCircle,closeCircleOutline});
  }

  products: any[] = [
    {"descripcion":"Harina Pan", "precio_item":100, "uuid": "5a6s4d8a9sd1asd8", cantidad:0, disponible:10},
    {"descripcion":"Harina Mary", "precio_item":200, "uuid": "7f6g5h9j0kl2mno3", cantidad:0, disponible:1},
    {"descripcion":"Harina De Trigo", "precio_item":300, "uuid": "1q2w3e4r5t6y7u8i9", cantidad:0, disponible:5},
  ];

  loading: boolean = false;

  ngOnInit(){

  }
  selectProduct(event: any){

  }
  
  sendData(data:any) {
    data.cantidad = 1;
    this.modalController.dismiss({data:data}); // Cerrar el modal
  }

  filterItems($event:any){
    this.loading = true;
    setTimeout(() => {
      this.loading = false;
    }, 5000);
  }

  closeModal() {
    this.modalController.dismiss();
  }
}
