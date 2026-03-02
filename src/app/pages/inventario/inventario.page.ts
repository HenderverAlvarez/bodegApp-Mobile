import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AppHeaderComponent } from 'src/app/components/commons/app-header/app-header.component';
import { addCircleOutline, removeCircleOutline, create, arrowForwardCircleOutline, arrowBack, trashBin } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { ModalController } from '@ionic/angular';
import { FormProductoModalComponent } from 'src/app/components/ventas/form-producto-modal/form-producto-modal.component';
import { ProductCardComponent } from 'src/app/components/commons/product-card/product-card.component';
import { Router } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { InventarioService } from 'src/app/services/inventario_service';
import { InventarioListaComponent } from 'src/app/components/inventario/inventario-lista/inventario-lista.component';


@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.page.html',
  styleUrls: ['./inventario.page.scss'],
  standalone: true,
  imports: [IonicModule, AppHeaderComponent,  CommonModule, FormsModule, ProductCardComponent, InventarioListaComponent, HttpClientModule]
})
export class InventarioPage implements OnInit {

  productos:any[]=[]
  mensaje:string=""
  showInventario:boolean=false;
  showCategorias:boolean=false;
  loading:boolean=false;

  constructor( private modalController: ModalController, private router : Router, private inventarioSvc: InventarioService) { 
    addIcons({create,addCircleOutline,removeCircleOutline,arrowForwardCircleOutline,arrowBack,trashBin});
  }

  ngOnInit() {  }

  setShowInventario(){
    this.showInventario=!this.showInventario;
  }

  setShowCategorias(){
    this.showCategorias=!this.showCategorias;
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: FormProductoModalComponent,
      cssClass: 'modal-xl', // Clase CSS opcional para personalizar el estilo
    });
    
    modal.onDidDismiss().then((result) => {
      if (result.data) {
        console.log(result.data)
      }
    });

    return await modal.present();  
  }

  ionViewWillEnter(){
   
  }
  ionViewWillLeave(){
    this.showInventario = false;
    this.showCategorias = false;
  }
  navigate(url: string){
    this.router.navigateByUrl(url);
  }

}
