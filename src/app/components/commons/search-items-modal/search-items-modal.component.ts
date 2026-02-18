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

  products:any[]=[
    {
      id:1,
      nombre:'Producto 1',
      descripcion:'Harina 1',
      precio:10.99,
      cantidad:5,
      imagen:'https://via.placeholder.com/150'
    },
    {
      id:2,
      nombre:'Producto 2',
      descripcion:'Harina 2',
      precio:15.99,
      cantidad:5,
      imagen:'https://via.placeholder.com/150'
    },
    {
      id:3,
      nombre:'Producto 3',
      descripcion:'Harina 3',
      precio:20.99,
      cantidad:5,
      imagen:'https://via.placeholder.com/150'
    }
  ]
  
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
