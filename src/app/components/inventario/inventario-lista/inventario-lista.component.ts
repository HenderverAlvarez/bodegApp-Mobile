import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { InventarioService } from 'src/app/services/inventario_service';
import { trashBin, pencil, cog, bagAdd } from 'ionicons/icons';
import { ProductCardComponent } from 'src/app/components/commons/product-card/product-card.component';
import { addIcons } from 'ionicons';
import { ModalController } from '@ionic/angular';
import { EditItemModalComponent } from '../edit-item-modal/edit-item-modal.component';

@Component({
  selector: 'inventario-lista',
  templateUrl: './inventario-lista.component.html',
  styleUrls: ['./inventario-lista.component.scss'],
  standalone: true,
  imports: [IonicModule, CommonModule, ProductCardComponent]

})
export class InventarioListaComponent  implements OnInit {

  constructor(private inventarioSvc: InventarioService, private modalController: ModalController) { 

    addIcons({trashBin, pencil,cog, bagAdd})
  }

  productos:any[]=[]
  mensaje:string=""
  showInventario:boolean=false;
  showCategorias:boolean=false;
  loading:boolean=false;

  ngOnInit() {this.getInventario()}
  getInventario(){
    this.productos = [];
    this.loading = true;
    this.inventarioSvc.getItems(1, '').subscribe(
    (res:any)=>{
      if(res.status_code == 200){
        this.productos = res.data
        this.mensaje= '';
        this.loading = false;
      }
    }, 
    (error:any)=>{
      this.loading = false;
    })
  }
  filterItems($event:any){
    this.loading = true;
    this.productos = [];
    this.inventarioSvc.getItems(1, $event.target.value).subscribe(
      (res:any)=>{
        if(res.status_code == 200){
          this.productos=res.data
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
  async openModal(item:any) {

    const modal = await this.modalController.create({
      component: EditItemModalComponent,
      cssClass: 'modal-xl',
      componentProps: {item:item},
    });
    
    modal.onDidDismiss().then((result) => {
      if (result.data) {
        console.log(result.data)
        this.getInventario();
      }
    });

    return await modal.present();  
  }
}
