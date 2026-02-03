import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonSegment, IonSegmentButton, IonLabel, IonChip, IonIcon, IonItem, IonInput, IonDatetime, IonModal, IonDatetimeButton, IonCard, IonCardContent, IonCardHeader, IonToggle, IonList, IonButton, IonAvatar, IonImg, IonButtons } from '@ionic/angular/standalone';
import { AppHeaderComponent } from 'src/app/components/commons/app-header/app-header.component';
import {FormGroup, FormControl, Validators, FormBuilder, } from '@angular/forms';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { arrowBack, addCircle } from 'ionicons/icons';
import { AppInputComponent } from 'src/app/components/commons/app-input/app-input.component';
import { SearchItemsModalComponent } from 'src/app/components/commons/search-items-modal/search-items-modal.component';
import { ModalController } from '@ionic/angular';
import { IonicModule } from '@ionic/angular';
import { ProductCardComponent } from 'src/app/components/commons/product-card/product-card.component';

@Component({
  selector: 'app-new-venta',
  templateUrl: './new-venta.page.html',
  styleUrls: ['./new-venta.page.scss'],
  standalone: true,
  imports: [IonicModule, AppInputComponent, AppHeaderComponent, CommonModule, FormsModule,ReactiveFormsModule, ProductCardComponent]
})
export class NewVentaPage implements OnInit {
  
  constructor(private router: Router, private formBuilder: FormBuilder, private modalController: ModalController) { 
    addIcons({arrowBack,addCircle});


  }
  formVenta: FormGroup = this.formBuilder.group({
    cliente: new FormControl('', [Validators.required]),
    fecha: new FormControl('', [Validators.required]),
    total: new FormControl('', [Validators.required]),
    mora: new FormControl(true, []),
  });
  items:any[]=[]

  ngOnInit() {
  }

  goBack(){
    this.router.navigate(['/inicio/tienda']);
  }

  registrarVenta(){
    console.log(this.formVenta.value);
  }

  async openModal() {
    const modal = await this.modalController.create({
      component: SearchItemsModalComponent,
      cssClass: 'my-custom-modal', // Clase CSS opcional para personalizar el estilo
    });
    
    modal.onDidDismiss().then((result) => {
      if (result.data) {
        this.items.push(result.data.data); // Manejar la información recibida

        console.log('Item agregado:', result.data.data);
      }
    });

    return await modal.present();  
  }

  calcularTotal(){
    let total = 0;
    this.items.forEach(item => {
      total += item.precio //* item.cantidad;
    });
    this.formVenta.controls['total'].setValue(total);
    return total;
  }
  

  ionViewWillLeave(){
    this.items = [];
    this.formVenta.reset();
    this.formVenta.controls['mora'].setValue(true);
  }
}
