import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonHeader, IonTitle, IonToolbar, IonGrid, IonRow, IonCol, IonSegment, IonSegmentButton, IonLabel, IonChip, IonIcon, IonItem, IonInput, IonDatetime, IonModal, IonDatetimeButton } from '@ionic/angular/standalone';
import { AppHeaderComponent } from 'src/app/components/commons/app-header/app-header.component';
import {FormGroup, FormControl, Validators, FormBuilder, } from '@angular/forms';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { arrowBack } from 'ionicons/icons';

@Component({
  selector: 'app-new-venta',
  templateUrl: './new-venta.page.html',
  styleUrls: ['./new-venta.page.scss'],
  standalone: true,
  imports: [IonDatetimeButton, IonModal, IonDatetime, IonInput, IonItem, IonIcon, IonChip, IonLabel, IonCol, IonRow, IonGrid, AppHeaderComponent, IonContent, CommonModule, FormsModule,ReactiveFormsModule]
})
export class NewVentaPage implements OnInit {

  constructor(private router: Router, private formBuilder: FormBuilder,) { 
    addIcons({arrowBack});

  }

  ngOnInit() {
  }

  goBack(){
    this.router.navigate(['/inicio/tienda']);
  }

}
