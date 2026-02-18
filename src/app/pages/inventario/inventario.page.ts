import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { AppHeaderComponent } from 'src/app/components/commons/app-header/app-header.component';
import { addCircleOutline, removeCircleOutline, create, arrowForwardCircleOutline } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { ModalController } from '@ionic/angular';
import { FormProductoModalComponent } from 'src/app/components/ventas/form-producto-modal/form-producto-modal.component';
import { ProductCardComponent } from 'src/app/components/commons/product-card/product-card.component';
import { Router } from '@angular/router';

@Component({
  selector: 'app-inventario',
  templateUrl: './inventario.page.html',
  styleUrls: ['./inventario.page.scss'],
  standalone: true,
  imports: [IonicModule, AppHeaderComponent,  CommonModule, FormsModule, ProductCardComponent]
})
export class InventarioPage implements OnInit {

  productos:any[]=[
    {
      id:1,
      nombre:'Producto 1',
      descripcion:'Harina 1',
      precio_bs:10.99,
      precio_usd:10.99,
      cantidad:5,
      imagen:'https://via.placeholder.com/150'
    },
    {
      id:1,
      nombre:'Producto 1',
      descripcion:'Harina 1',
      precio_bs:10.99,
      precio_usd:10.99,
      cantidad:5,
      imagen:'https://via.placeholder.com/150'
    },
    {
      id:1,
      nombre:'Producto 1',
      descripcion:'Harina 1',
      precio_bs:10.99,
      precio_usd:10.99,
      cantidad:5,
      imagen:'https://via.placeholder.com/150'
    },
  ]

  showInventario:boolean=false;

  constructor( private modalController: ModalController, private router : Router ) { 
    addIcons({create,addCircleOutline,removeCircleOutline,arrowForwardCircleOutline});

  }

  ngOnInit() {
  }

  setShowInventario(){
    this.showInventario=!this.showInventario;
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: FormProductoModalComponent,
      cssClass: 'my-custom-modal', // Clase CSS opcional para personalizar el estilo
    });
    
    modal.onDidDismiss().then((result) => {
      if (result.data) {
        console.log(result.data)
      }
    });

    return await modal.present();  
  }

  navigate(url: string){
    this.router.navigateByUrl(url);
  }

}
