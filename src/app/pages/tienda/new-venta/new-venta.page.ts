import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppHeaderComponent } from 'src/app/components/commons/app-header/app-header.component';
import {FormGroup, FormControl, Validators, FormBuilder, } from '@angular/forms';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { arrowBack, addCircle, trashBin, removeCircleOutline, addCircleOutline, closeOutline, cashOutline, phonePortraitOutline, cardOutline, swapHorizontalOutline} from 'ionicons/icons';
import { AppInputComponent } from 'src/app/components/commons/app-input/app-input.component';
import { SearchItemsModalComponent } from 'src/app/components/commons/search-items-modal/search-items-modal.component';
import { ModalController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { ProductCardComponent } from 'src/app/components/commons/product-card/product-card.component';
import {VentasService} from 'src/app/services/ventas_service';
import { HttpClientModule } from '@angular/common/http';
import { RouterLink } from '@angular/router';
import { ModalConfirmationComponent } from 'src/app/components/commons/modal-confirmation/modal-confirmation.component';

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
    addIcons({arrowBack,addCircle,trashBin, removeCircleOutline, addCircleOutline, closeOutline, cashOutline, phonePortraitOutline, cardOutline, swapHorizontalOutline});
  }
  formVenta: FormGroup = this.formBuilder.group({
    cliente: new FormControl('', [Validators.required]),
    contacto_cliente: new FormControl('', [Validators.required]),
    mora: new FormControl(true, []),
    metodo: new FormControl('',  [Validators.required]),
    monto: new FormControl('',  [Validators.required]),
  });

  loading:boolean=false;
  items:any[]=[]
  tasa: number = 390.00;
  step:string='productos'
  isOpenPop = false;
  modalSearch=SearchItemsModalComponent;
  modalConfirmation=ModalConfirmationComponent;

  showPagos:boolean=false;
  pagos:any[]=[];

  ngOnInit() {
  }

  goBack(){
    this.router.navigate(['/inicio/tienda']);
  }

  registrarVenta(){
    //console.log(this.formVenta.status)
    this.loading=true;
    let mora = this.formVenta.value.mora ? 'No' : 'Si';
    let data = {
      total: this.calcularTotal(),
      total_usd: this.calcularTotalUsd(),
      mora: mora,
      lines: this.items,
      nombre_cliente: this.formVenta.value.cliente,
      contacto_cliente: this.formVenta.value.contacto_cliente,
      metodo_pago: this.formVenta.value.metodo
    }

    this.ventasSvc.insertVenta(data).subscribe({
      next: (res) => {
        if(res.status_code == 200){
            this.loading=false;
            this.openModal(this.modalConfirmation, 'modal-sm').then(() => {
            this.router.navigate(['/inicio/tienda']);
          
            });
        }
        console.log(res);
      },
      error: (err) => {
        this.loading=false;
        console.log(err);
      }
    });

}

  async openModal(component:any, modalClass:string) {
    let data = {}
    if(modalClass === 'modal-sm'){data = {mensaje: "Venta cargada con exito!", icon: "checkmark-circle-outline"}}

    const modal = await this.modalController.create({
      component: component,
      cssClass: modalClass,
      componentProps: data,
      // Clase CSS opcional para personalizar el estilo
    });
    
    modal.onDidDismiss().then((result) => {
      if (result.data) {

        //si existe el item sumamos +cantidad del item
        if (this.items.find(i => i.uuid === result.data.data.uuid)){
          this.items.forEach(i => {
            if(i.uuid === result.data.data.uuid){
              if(i.cantidad < i.stock && i.cantidad + result.data.data.cantidad < i.stock)i.cantidad += result.data.data.cantidad;
              else this.isOpenPop=true;
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
      total += item.precio_bs * item.cantidad;
    });
    return total;
  }

  calcularTotalUsd(){
    let total = 0;
    this.items.forEach(item => {
      total += item.precio_usd  * item.cantidad;
    });
    return parseFloat(total.toFixed(2));
  }

  calcularPrecio(event:any, item:any){
    let monto = event.target.value;
    let bs_kg = item.precio_usd * this.tasa
    let cantidad;

    if(monto > 0){
      cantidad = (monto / bs_kg).toFixed(2)

      if(parseFloat(cantidad) > parseFloat(item.stock)){
        this.isOpenPop=true;
        item.cantidad = item.stock
        event.preventDefault()
      }else item.cantidad = cantidad
      
    }
  }
  calcularCantidad(event:any, item:any){
    let cantidad = event.target.value
    console.log(item.stock)
    if(cantidad > parseFloat(item.stock)){
      this.isOpenPop=true;
      console.log("Si es mayor")
      item.cantidad = item.stock
    }else{
      if(event.target.value > 0){item.cantidad=event.target.value}
    }

    
  }
  calcularPagos(){
    let total = 0;
    this.pagos.forEach(pago => {
      total += pago.monto;
    });
    return total;
  }
  clearPagos(){
    this.pagos = [];
  }
  showAddPago(){
    this.showPagos = true;
  }

  addPago(){
    let metodo = this.formVenta.value.metodo;
    let monto = this.formVenta.value.monto;
    //validar que la suma del monto que se va a ingresar sumado al resto de pagos no sea mayor al total de la venta
    if(this.calcularPagos() + parseFloat(monto) > this.calcularTotal()){
      this.isOpenPop = true;
      return;
    }

    if(metodo && monto > 0){
      this.pagos.push({metodo: metodo, monto: parseFloat(monto)});
      this.formVenta.controls['metodo'].setValue('');
      this.formVenta.controls['monto'].setValue('');
      this.showPagos = false;
    }
  }
  setAll(){
    this.formVenta.controls['monto'].setValue(this.calcularTotal());
  }
  setHalf(){
    this.formVenta.controls['monto'].setValue(this.calcularTotal()/2);
  }

  nextStep(){
    switch (this.step) {
      case 'productos':
      this.step = 'cliente';
      break;
      case 'cliente':
      this.step = 'pago';
      break;
      default:
      this.step = 'productos';
      break;
    }
  }

  prevStep(){
    if (this.step === 'cliente') {
      this.step = 'productos';
    } else if (this.step === 'pago') {
      this.step = 'cliente';
    }
  }

  eliminarItem(item:any){
    this.items = this.items.filter(i => i !== item);
    this.calcularTotal();
  }

  add(item:any, event?: Event){
    this.items.forEach(i => {
      if(i === item){
        if(item.cantidad < item.stock)i.cantidad += 1;
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
    this.pagos=[];
    this.showPagos = false;
    this.loading=false;
    this.step = "productos";
    this.items = [];
    this.formVenta.reset();
    this.formVenta.controls['mora'].setValue(true);
  }
}
