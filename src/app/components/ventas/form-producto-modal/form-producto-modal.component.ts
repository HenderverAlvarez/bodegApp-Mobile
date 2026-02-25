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
import { InventarioService } from 'src/app/services/inventario_service';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-form-producto-modal',
  templateUrl: './form-producto-modal.component.html',
  styleUrls: ['./form-producto-modal.component.scss'],
  standalone: true,
  imports: [ProductCardComponent, IonicModule, CommonModule, FormsModule, AppInputComponent, ReactiveFormsModule, HttpClientModule],
  schemas:[CUSTOM_ELEMENTS_SCHEMA]

})
export class FormProductoModalComponent  implements OnInit { 
  @ViewChild('popover') popover!: HTMLIonPopoverElement;
  constructor(private modalController: ModalController, private router: Router, private formBuilder: FormBuilder, private inventarioSvc:InventarioService) { 
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

  recomendadoSelected:any = null;
  step:string = 'descripcion';
  imagePreview:any;
  selectedFile: File | null = null;
  imagen_url:string=""
  isToastOpen:boolean=false
  loading:boolean=false
  errorProducto:string= ""
  errorImagen:string= ""

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
        this.recomendadoSelected ? this.step = "confirmar": this.step = 'imagen';
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
        this.recomendadoSelected ? this.step = "descripcion": this.step = 'unidad_medida';
        break;
      case 'imagen':
        this.step = 'precio';
        break;
      case 'confirmar':
        this.step = 'imagen';
        break;
    }
    this.errorProducto = ''
  }

  async getRecomendados(event: any) {
    // Filtrar productos por recomendados
    this.inventarioSvc.getItemsInfo(1, event.target.value).subscribe(
      (res:any)=>{
        if(res.status_code == 200){
          this.recomendados = res.data
        }else{
          this.recomendados = []
        }
      }, 
      (error:any)=>{this.errorProducto = error.error.detail})    
  }

  selectInfo(item:any){
    console.log(item)
    this.step = "unidad_medida"
    this.recomendadoSelected = item
    this.formProducto.controls['unidad_medida'].setValue(item.unidad_medida);
    this.formProducto.controls['descripcion'].setValue(item.descripcion);
    this.formProducto.controls['imagen'].setValue(item.foto_url)
  }

  setImage(event: any) {
    const file = event.target.files[0];
    if (file) {
      const validFormats = ['image/png', 'image/jpeg', 'image/webp'];
      if (!validFormats.includes(file.type)) {
        this.errorImagen = 'El archivo debe ser de formato PNG o JPG.';
        return;
      }
      this.errorImagen = '';
      const reader = new FileReader();
      reader.onload = (e) => {
        this.imagePreview = e.target?.result; // Guardar la vista previa de la imagen
        this.selectedFile = file;

        // Crear una URL temporal para la imagen
        const tempUrl = URL.createObjectURL(file);
        this.imagen_url =tempUrl; // Mostrar la URL temporal en la consola
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

  isNextStepDisabled(): boolean {
    const descripcionInvalid = this.formProducto.controls['descripcion'].value === '';
    const cantidadInvalid = this.formProducto.controls['cantidad'].value === '' || this.formProducto.controls['cantidad'].value === 0 ||
                             this.formProducto.controls['unidad_medida'].value === '';
    const precioInvalid = this.formProducto.controls['precio_bs'].value === 0 ||
                          this.formProducto.controls['precio_usd'].value === 0;
    const imagenInvalid = this.imagePreview == null || this.errorImagen != '';

    return (this.step === 'descripcion' && descripcionInvalid) ||
           (this.step === 'cantidad' && cantidadInvalid) ||
           (this.step === 'precio' && precioInvalid) ||
           (this.step === 'imagen' && imagenInvalid);
  }

  convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const validFormats = ['image/png', 'image/jpeg'];
      if (!validFormats.includes(file.type)) {
        reject(new Error('El archivo debe ser de formato PNG o JPG.'));
        return;
      }

      const reader = new FileReader();
      reader.onloadend = () => {
        // El resultado está en base64
        resolve(reader.result as string);
      };
      reader.onerror = (error) => {
        reject(error);
      };
      reader.readAsDataURL(file); // Leer el archivo como base64
    });
  }

  async confirmar(){
    this.loading=true
    if (this.selectedFile && this.recomendadoSelected == null) {
      this.convertFileToBase64(this.selectedFile).then(base64 => {
        let data = {
          descripcion: this.formProducto.controls['descripcion'].value,
          cantidad: this.formProducto.controls['cantidad'].value,
          precio_usd: this.formProducto.controls['precio_usd'].value,
          precio_bs: this.formProducto.controls['precio_bs'].value,
          unidad_medida: this.formProducto.controls['unidad_medida'].value,
          foto: base64
        }

        this.inventarioSvc.insertProducto(data).subscribe(
          (res:any)=>{
            console.log(res.status_code)
            if(res.status_code == 200){
              this.isToastOpen = true
              this.router.navigate(['/inicio/inventario']);
              this.modalController.dismiss()
              this.loading=false
            }
          }, 
          (error:any)=>{
            console.log(error.error.detail)
            if(error.error.detail){
              this.errorProducto = error.error.detail
            }
            this.loading=false
        })  
      });
    } else {
      let data = {
        descripcion: this.formProducto.controls['descripcion'].value,
        cantidad: this.formProducto.controls['cantidad'].value,
        precio_usd: this.formProducto.controls['precio_usd'].value,
        precio_bs: this.formProducto.controls['precio_bs'].value,
        unidad_medida: this.formProducto.controls['unidad_medida'].value,
        foto_url: this.recomendadoSelected.foto_url,
        item_info_id: this.recomendadoSelected.uuid
      }

      this.inventarioSvc.insertProducto(data).subscribe(
        (res:any)=>{
          console.log(res.status_code)
          if(res.status_code == 200){
            this.isToastOpen = true
            this.router.navigate(['/inicio/inventario']);
            this.modalController.dismiss()
            this.loading=false
          }
        }, 
        (error:any)=>{
          console.log(error.error.detail)
          if(error.error.detail){
            this.errorProducto = error.error.detail
          }
          this.loading=false
      })  
    }     
  }

  setOpen(){
    this.isToastOpen = !this.isToastOpen
  }
}
