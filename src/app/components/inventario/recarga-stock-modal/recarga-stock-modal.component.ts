import { Component, Input, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { InventarioService } from 'src/app/services/inventario_service';
import { ModalController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';

import {FormGroup, FormControl, Validators, FormBuilder, } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonService } from 'src/app/services/common_service';

@Component({
  selector: 'recarga-stock-modal',
  templateUrl: './recarga-stock-modal.component.html',
  styleUrls: ['./recarga-stock-modal.component.scss'],
  standalone:true,
  imports: [CommonModule, IonicModule, ReactiveFormsModule]
})
export class RecargaStockModalComponent  implements OnInit {
  @Input() item:any;
  constructor(private formBuilder: FormBuilder, private modalController: ModalController, private inventarioSvc: InventarioService, private commonSvc: CommonService) { addIcons({close})}
  editForm: FormGroup = this.formBuilder.group({
    stock: new FormControl('',  [Validators.required]),
  });
  isToastOpen:boolean=false
  mensajeToast:string="";
  loading:boolean=false;

  ngOnInit() {
    this.editForm.patchValue({
      stock: this.item.stock
    });
  }
  
  send(){
    this.loading = true
    let data = {
      stock: this.editForm.value.stock,
      uuid:this.item.uuid
    }
    this.inventarioSvc.editStock(data).subscribe(
    (res:any)=>{
      this.loading = false;
      if (res.status_code == 200){
        this.mensajeToast="Item Modificado Exitosamente!";
        this.setOpen();
        this.dismissModal(res);
      }
      
    }, 
    (error:any)=>{
      this.loading = false;
      if(error.status == 401){
        this.commonSvc.closeSesionByToken()
      }
    });
  }

  add(cantidad:number){
    this.editForm.controls['stock'].setValue(parseFloat(this.editForm.value.stock) + cantidad);
  }
  
  setOpen(){
    this.isToastOpen = !this.isToastOpen
  }

  dismissModal(data?: any) {
    this.modalController.dismiss(data);
  }
}
