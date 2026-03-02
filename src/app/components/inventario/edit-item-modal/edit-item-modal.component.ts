import { Component, OnInit, Input } from '@angular/core';
import { IonicModule } from '@ionic/angular';
import {FormGroup, FormControl, Validators, FormBuilder, } from '@angular/forms';
import { ProductCardComponent } from '../../commons/product-card/product-card.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ModalController } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { close } from 'ionicons/icons';

@Component({
  selector: 'edit-item-modal',
  templateUrl: './edit-item-modal.component.html',
  styleUrls: ['./edit-item-modal.component.scss'],
  standalone: true,
  imports: [IonicModule, ProductCardComponent, ReactiveFormsModule]
})
export class EditItemModalComponent  implements OnInit {
  @Input() item:any;

  constructor(private formBuilder: FormBuilder, private modalController: ModalController) { 
    addIcons({close})
  }

  editForm: FormGroup = this.formBuilder.group({
    precio: new FormControl('', [Validators.required]),
    descripcion: new FormControl('', []),
    stock: new FormControl('',  [Validators.required]),
  });

  ngOnInit() {
    if(this.item){
      this.editForm.patchValue({
        precio: this.item.precio,
        descripcion: this.item.descripcion,
        stock: this.item.stock
      });
    }
  }
  onSubmit(){

  }
  
  dismissModal(){

  }

}
