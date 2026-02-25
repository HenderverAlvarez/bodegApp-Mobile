import { Component, OnInit,Output,EventEmitter } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonButtons, IonButton, IonContent, IonIcon, IonRow, IonGrid, IonCol, IonSearchbar, IonSpinner, IonList, IonItem, IonLabel } from "@ionic/angular/standalone";
import { ModalController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { closeCircleOutline,closeCircle, arrowForwardCircleOutline } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { InventarioService } from 'src/app/services/inventario_service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-search-items-modal',
  templateUrl: './search-items-modal.component.html',
  styleUrls: ['./search-items-modal.component.scss'],
  standalone: true,
  imports: [IonLabel, ProductCardComponent, IonItem, IonList, CommonModule, IonSpinner, IonSearchbar, IonCol, IonGrid, IonRow, IonIcon, IonContent, IonButtons, IonTitle, IonToolbar, IonHeader, ]
})
export class SearchItemsModalComponent  implements OnInit {
  @Output() dataSent = new EventEmitter<any>();
  constructor(private modalController: ModalController, private inventarioSvc: InventarioService, private router: Router) {
    addIcons({closeCircle,arrowForwardCircleOutline,closeCircleOutline});
  }

  products:any[]=[]
  
  loading: boolean = false;
  mensaje:string="";

  ngOnInit(){}

  selectProduct(event: any){

  }
  
  sendData(data:any) {
    data.cantidad = 1;
    this.modalController.dismiss({data:data}); // Cerrar el modal
  }

  filterItems($event:any){
    this.loading = true;
    this.products = []
    this.inventarioSvc.getItems(1, $event.target.value).subscribe(
      (res:any)=>{
        console.log(res)
        if(res.status_code == 200){
          this.products=res.data
          this.mensaje= ''
        }
        else{
          this.mensaje = res.detail
        }
        this.loading = false;
      }, 
      (error:any)=>{
        this.loading = false;
      })
  }

  navigate(route:string){
    this.router.navigateByUrl(route)
    this.closeModal()
  }
  closeModal() {
    this.modalController.dismiss();
  }

}
