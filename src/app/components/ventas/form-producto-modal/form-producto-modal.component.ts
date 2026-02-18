import { Component, OnInit } from '@angular/core';
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
@Component({
  selector: 'app-form-producto-modal',
  templateUrl: './form-producto-modal.component.html',
  styleUrls: ['./form-producto-modal.component.scss'],
  standalone: true,
  imports: [ProductCardComponent, IonicModule, CommonModule, FormsModule, AppInputComponent, ReactiveFormsModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]

})
export class FormProductoModalComponent  implements OnInit {

  constructor(private modalController: ModalController, private router: Router, private formBuilder: FormBuilder,) { 
    addIcons({arrowBackCircleOutline});
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

  formProducto: FormGroup = this.formBuilder.group({
    nombre: new FormControl('', [Validators.required]),
    recomendados: new FormControl(true, [Validators.required]),
    unidad_medida: new FormControl(true, [Validators.required]),
  });

  step:string = 'descripcion';

  ngOnInit() {}

  nextStep(){
    switch(this.step){
      case 'descripcion':
        this.step = 'unidad_medida';
        break;
      case 'unidad_medida':
        this.step = 'cantidad';
        break;
      case 'cantidad':
        this.step = 'precio';
        break;
    }
  }
  prevStep(){ 
    switch(this.step){
      case 'unidad_medida':
        this.step = 'descripcion';
        break;
      case 'cantidad':
        this.step = 'unidad_medida';
        break;
      case 'precio':
        this.step = 'cantidad';
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

}
