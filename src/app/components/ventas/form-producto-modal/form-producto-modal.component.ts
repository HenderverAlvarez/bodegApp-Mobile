import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';
import {FormGroup, FormControl, Validators, FormBuilder, } from '@angular/forms';
import { AppInputComponent } from 'src/app/components/commons/app-input/app-input.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { ProductCardComponent } from '../../commons/product-card/product-card.component';
import { addIcons } from 'ionicons';
import { arrowBackCircleOutline } from 'ionicons/icons';
import { helpCircleOutline } from 'ionicons/icons';
@Component({
  selector: 'app-form-producto-modal',
  templateUrl: './form-producto-modal.component.html',
  styleUrls: ['./form-producto-modal.component.scss'],
  standalone: true,
  imports: [ProductCardComponent, IonicModule, CommonModule, FormsModule, AppInputComponent, ReactiveFormsModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]

})
export class FormProductoModalComponent  implements OnInit {

  @ViewChild('popover') popover!: HTMLIonPopoverElement;
  constructor(private modalController: ModalController, private router: Router, private formBuilder: FormBuilder,) { 
    addIcons({arrowBackCircleOutline, helpCircleOutline});
  }
  products:any[]=[
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
      id:2,
      nombre:'Producto 2',
      descripcion:'Harina 2',
      precio_bs:15000,
      precio_usd:30,
      cantidad:5,
      imagen:'https://via.placeholder.com/150'
    },
  ]
  recomendados: any[] = [];
  isOpen: boolean = false;
  formProducto: FormGroup = this.formBuilder.group({
    descripcion: new FormControl('', [Validators.required]),
    cantidad: new FormControl(0, [Validators.required]),
    unidad_medida: new FormControl('unidades', [Validators.required]),
    precio_bs: new FormControl(0, [Validators.required]),
    precio_usd: new FormControl(0, [Validators.required]),
    imagen: new FormControl(null)
  });

  step:string = 'descripcion';
  imagePreview:any;
  ngOnInit() {}

  nextStep(){
    switch(this.step){
      case 'descripcion':
        this.step = 'unidad_medida';
        break;
      case 'unidad_medida':
        this.step = 'precio';
        break;
      case 'precio':
        this.step = 'imagen';
        break;
      case 'imagen':
        this.step = 'confirmar';
        break;
    }
  }
  presentPopover(e: Event) {
    this.popover.event = e;
    this.isOpen = true;
  }
  prevStep(){ 
    switch(this.step){
      case 'descripcion':
        this.step = 'descripcion';
        break;
      case 'unidad_medida':
        this.step = 'descripcion';
        break;
      case 'precio':
        this.step = 'unidad_medida';
        break;
      case 'imagen':
        this.step = 'precio';
        break;
      case 'confirmar':
        this.step = 'imagen';
        break;
    }
  }
  async getRecomendados(event: any) {
    // Filtrar productos por recomendados
    const searchTerm = event.target.value.toLowerCase();
    console.log(searchTerm)
    this.recomendados = this.products.filter(product => 
        product.descripcion.toLowerCase().includes(searchTerm)
    );
  }

  setImage(event:any){
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result; // Guardar la vista previa de la imagen
      };
      reader.readAsDataURL(file);
      this.formProducto.patchValue({
        image: file
      });
    }
  }
  calcularUSD(){
    const precioBs = this.formProducto.get('precio_bs')?.value || 0;
    const tipoCambio = 390; // Ejemplo de tipo de cambio
    const precioUsd = precioBs / tipoCambio;
    this.formProducto.get('precio_usd')?.setValue(precioUsd.toFixed(2));
  }
  calcularBs(){
    const precioUsd = this.formProducto.get('precio_usd')?.value || 0;
    const tipoCambio = 390; // Ejemplo de tipo de cambio
    const precioBs = precioUsd * tipoCambio;
    this.formProducto.get('precio_bs')?.setValue(precioBs.toFixed(2));
  }

}
