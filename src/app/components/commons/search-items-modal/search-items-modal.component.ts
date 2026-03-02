import { Component, OnInit,Output,EventEmitter, ViewChild } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { closeCircleOutline,closeCircle, arrowForwardCircleOutline } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
import { ProductCardComponent } from '../product-card/product-card.component';
import { InventarioService } from 'src/app/services/inventario_service';
import { Router } from '@angular/router';
import { FormGroup, ReactiveFormsModule, Validators, FormBuilder } from '@angular/forms';


@Component({
  selector: 'app-search-items-modal',
  templateUrl: './search-items-modal.component.html',
  styleUrls: ['./search-items-modal.component.scss'],
  standalone: true,
  imports: [ProductCardComponent, CommonModule, IonicModule, ReactiveFormsModule]
})
export class SearchItemsModalComponent  implements OnInit {
  @Output() dataSent = new EventEmitter<any>();
  @ViewChild('popover') popover!: HTMLIonPopoverElement;

  formProducto: FormGroup = new FormBuilder().group({
    cantidad: ['', [Validators.required]]
  });

  constructor(private modalController: ModalController, private inventarioSvc: InventarioService, private router: Router) {
    addIcons({closeCircle,arrowForwardCircleOutline,closeCircleOutline});
  }

  products:any[]=[]
  isToastOpen:boolean=false;
  selectedProduct:any=null;
  loading: boolean = false;
  mensaje:string="Ingresa el nombre del producto que buscas vender.";
  mensajeToast:string="";
  step:string="productos";
  isOpenPop = false;
  tasa: number = 390.00;
  precio_bs:number=0;

  ngOnInit(){}

  selectProduct(event: any){

  }
  
  sendData(data:any) {

    this.modalController.dismiss({data:data}); // Cerrar el modal
  }

  nextStep(item:any){
    if(item.estado == "Agotado"){
      this.mensajeToast="Este producto esta Agotado!";
      this.isToastOpen=true;
    }else{
      item.cantidad = 1
      this.selectedProduct = item
      this.step = 'cantidad'
    }
  }
  prevStep(){
    this.selectedProduct = null;
    this.step = 'productos';
    this.products = [];
    this.mensaje ="Ingresa el nombre del producto que buscas vender."
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
  calcularTotal(){

    let item = this.selectedProduct
    let total = 0;
    
    total += item.precio_bs * item.cantidad;

    return total;
  }
  calcularTotalUsd(){
    let total = 0;
    total += this.selectedProduct.precio_usd  * this.selectedProduct.cantidad;
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
        item.cantidad = parseFloat(item.stock)
        event.preventDefault()
        this.precio_bs = this.calcularTotal();
      }else{ 
        item.cantidad = parseFloat(cantidad)
      }
      
    }
  }
  calcularCantidad(event:any, item:any){
    let cantidad = event.target.value
    
    if(cantidad > parseFloat(item.stock)){
      this.isOpenPop=true;
      item.cantidad = item.stock
    }else{
      if(event.target.value > 0){item.cantidad= parseFloat(event.target.value)}
    }

    
  }

  setCantidad(event:any){
    let regex = /^[0-9]+$/; // Expresión regular para permitir solo números enteros
    //validar que permita borrar 

    if(!regex.test(event.target.value) && event.inputType !== 'deleteContentBackward'){
      this.formProducto.controls['cantidad'].setValue(this.selectedProduct.cantidad.toString().replace(/\D/g, '')); // Eliminar cualquier carácter no numérico
      event.preventDefault();
      return
    }

    if(event.target.value > parseFloat(this.selectedProduct.stock)){
      this.isOpenPop=true;
      this.selectedProduct.cantidad = this.selectedProduct.stock
      this.formProducto.controls['cantidad'].setValue(this.selectedProduct.stock)
    }else{
      if(event.target.value > 0){
        this.selectedProduct.cantidad= Math.round(parseFloat(event.target.value))
      }
    }
  }
  add(item:any, event?: Event){
      if(this.selectedProduct.cantidad < this.selectedProduct.stock)this.selectedProduct.cantidad += 1;
      else this.isOpenPop = true
  }
  remove(item:any){
    if(this.selectedProduct.cantidad > 1){
      this.selectedProduct.cantidad -= 1;
    }
  }
  presentPopover(e?: Event) {
    this.popover.event = e;
    this.isOpenPop = true;
  }
  navigate(route:string){
    this.router.navigateByUrl(route)
    this.closeModal()
  }
  closeModal() {
    this.modalController.dismiss();
  }
  setOpen(){
    this.isToastOpen = !this.isToastOpen
  }
}
