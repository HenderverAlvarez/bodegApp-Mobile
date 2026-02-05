import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppHeaderComponent } from 'src/app/components/commons/app-header/app-header.component';
import {FormGroup, FormControl, Validators, FormBuilder, } from '@angular/forms';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { arrowBack, addCircle, trashBin, removeCircleOutline, addCircleOutline, closeOutline} from 'ionicons/icons';
import { AppInputComponent } from 'src/app/components/commons/app-input/app-input.component';
import { SearchItemsModalComponent } from 'src/app/components/commons/search-items-modal/search-items-modal.component';
import { ModalController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { ProductCardComponent } from 'src/app/components/commons/product-card/product-card.component';
import {VentasService} from 'src/app/services/ventas_service';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
@Component({
  selector: 'app-new-venta',
  templateUrl: './new-venta.page.html',
  styleUrls: ['./new-venta.page.scss'],
  standalone: true,
  imports: [RouterLink, IonicModule, AppInputComponent, AppHeaderComponent, CommonModule, FormsModule,ReactiveFormsModule, HttpClientModule, ProductCardComponent]
})
export class NewVentaPage implements OnInit {
  @ViewChild('popover') popover!: HTMLIonPopoverElement;
  constructor(private router: Router, private formBuilder: FormBuilder, private modalController: ModalController, private ventasSvc:VentasService) { 
    addIcons({arrowBack,addCircle,trashBin, removeCircleOutline, addCircleOutline, closeOutline});
  }
  formVenta: FormGroup = this.formBuilder.group({
    cliente: new FormControl('', [Validators.required]),
    contacto_cliente: new FormControl('', [Validators.required]),
    mora: new FormControl(true, []),
  });
  items:any[]=[]
  tasa: number = 370.00;

  isOpenPop = false;

  ngOnInit() {
  }

  goBack(){
    this.router.navigate(['/inicio/tienda']);
  }

  registrarVenta(){
    console.log(this.formVenta.status)

    let mora = this.formVenta.value.mora ? 'No' : 'Si';
    let data = {
      total: this.calcularTotal(),
      total_usd: this.calcularTotalUsd(),
      mora: mora,
      lines: this.items,
      nombre_cliente: this.formVenta.value.cliente,
      contacto_cliente: this.formVenta.value.contacto_cliente,
    }

    this.ventasSvc.insertVenta(data).subscribe({
      next: (res) => {
        if(res.status_code == 200){
          this.router.navigate(['/inicio/tienda']);
        }
        console.log(res);
      },
      error: (err) => {
        console.log(err);
      }
    });

}

  async openModal() {
    const modal = await this.modalController.create({
      component: SearchItemsModalComponent,
      cssClass: 'my-custom-modal', // Clase CSS opcional para personalizar el estilo
    });
    
    modal.onDidDismiss().then((result) => {
      if (result.data) {

        //si existe el item sumamos +1
        if (this.items.find(i => i.uuid === result.data.data.uuid)){
          this.items.forEach(i => {
            if(i.uuid === result.data.data.uuid){
              if(i.cantidad < i.disponible)i.cantidad += 1;
              else this.presentPopover(event)
            }
          });
          this.calcularTotal();
          return;
        }else{
          this.items.push(result.data.data);
        }

      }
    });

    return await modal.present();  
  }

  calcularTotal(){
    let total = 0;
    this.items.forEach(item => {
      total += item.precio_item * item.cantidad;
    });
    return total;
  }

  calcularTotalUsd(){
    let total = 0;
    this.items.forEach(item => {
      total += (item.precio_item / this.tasa) * item.cantidad;
    });
    return parseFloat(total.toFixed(2));
  }

  eliminarItem(item:any){
    this.items = this.items.filter(i => i !== item);
    this.calcularTotal();
  }

  add(item:any, event?: Event){
    this.items.forEach(i => {
      if(i === item){
        if(item.cantidad < item.disponible)i.cantidad += 1;
        else this.presentPopover(event)
      }
    }
    );
  }

  remove(item:any){
    this.items.forEach(i => {
      if(i === item){
        if(i.cantidad > 1){
          i.cantidad -= 1;
        }
      }
    }
    );
  }
  presentPopover(e?: Event) {
    this.popover.event = e;
    this.isOpenPop = true;
  }
  ionViewWillLeave(){
    this.items = [];
    this.formVenta.reset();
    this.formVenta.controls['mora'].setValue(true);
  }
}
