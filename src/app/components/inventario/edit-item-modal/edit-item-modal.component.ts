import { Component, OnInit, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {FormGroup, FormControl, Validators, FormBuilder, } from '@angular/forms';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';
import { InventarioService } from 'src/app/services/inventario_service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'edit-item-modal',
  templateUrl: './edit-item-modal.component.html',
  styleUrls: ['./edit-item-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, ReactiveFormsModule, CommonModule]
})
export class EditItemModalComponent  implements OnInit {
  @Input() item:any;

  constructor(private formBuilder: FormBuilder, private modalController: ModalController, private inventarioSvc: InventarioService) { 
    addIcons({close})
  }

  editForm: FormGroup = this.formBuilder.group({
    precio: new FormControl('', [Validators.required]),
    precio_usd: new FormControl('', [Validators.required]),
    descripcion: new FormControl('',  [Validators.required]),
    stock: new FormControl('',  [Validators.required]),
    unidad_medida: new FormControl('',  [Validators.required]),
    imagen: new FormControl(null)
  });
  step:string="info";
  imagePreview:any;
  selectedFile: File | null = null;
  imagen_url:string=""
  isToastOpen:boolean=false
  loading:boolean=false
  errorImagen:string= ""
  mensajeToast:string="";


  ngOnInit() {
    if(this.item){
      this.editForm.patchValue({
        unidad_medida: this.item.unidad_medida,
        precio: this.item.precio_bs,
        precio_usd: this.item.precio_usd,
        descripcion: this.item.descripcion,
        stock: this.item.stock
      });
    }
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
      this.editForm.patchValue({
        image: file
      });
    }
  }
  async onSubmit(){
    let data = {}
    if (this.selectedFile) {
      this.convertFileToBase64(this.selectedFile).then(base64 => {
        data = {
          descripcion: this.editForm.value.descripcion,
          precio_bs: this.editForm.value.precio,
          precio_usd: this.editForm.value.precio_usd,
          stock: this.editForm.value.stock,
          unidad_medida: this.editForm.value.unidad_medida,
          uuid: this.item.uuid,
          foto: base64
        }

        this.inventarioSvc.editItem(data).subscribe(
          (res:any)=>{
            this.dismissModal({updated:true, mensaje: res.data})
            this.mensajeToast = "Producto editado con exito!"
            this.setOpen();
          }, 
          (error:any)=>{
            console.log(error)
          })
      })
    }else{
      data = {
        descripcion: this.editForm.value.descripcion,
        precio_bs: this.editForm.value.precio,
        precio_usd: this.editForm.value.precio_usd,
        stock: this.editForm.value.stock,
        unidad_medida: this.editForm.value.unidad_medida,
        uuid: this.item.uuid,
      }
      this.inventarioSvc.editItem(data).subscribe(
        (res:any)=>{
          
          if(res.status_code == 200){
            this.dismissModal({updated:true, mensaje: res.data})
            this.mensajeToast = "Producto editado con exito!"
            this.setOpen();
          }
        }, 
        (error:any)=>{
          console.log(error)
        })
    }
  }

  convertFileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const validFormats = ['image/png', 'image/jpeg', 'image/webp'];
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
  dismissModal(data?: any) {
    this.modalController.dismiss(data);
  }
  nexStep(){
    if(this.step == 'info'){
      this.step = 'foto';
    }else{
      this.step = 'info';
    }
  }
  prevStep(){
    if(this.step == 'foto'){
      this.step = 'info';
    }else{
      this.step = 'foto';
    }
  }
  setOpen(){
    this.isToastOpen = !this.isToastOpen
  }
}
