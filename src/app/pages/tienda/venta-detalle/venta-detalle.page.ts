import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AppHeaderComponent } from 'src/app/components/commons/app-header/app-header.component';
import {FormGroup, FormControl, Validators, FormBuilder, } from '@angular/forms';
import { addIcons } from 'ionicons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from 'src/app/services/common_service';

@Component({
  selector: 'app-venta-detalle',
  templateUrl: './venta-detalle.page.html',
  styleUrls: ['./venta-detalle.page.scss'],
  standalone: true,
  imports: [ AppHeaderComponent, CommonModule, IonicModule, FormsModule, ReactiveFormsModule]
})
export class VentaDetallePage implements OnInit {

  constructor(private commonSvc: CommonService) {
    addIcons({})
  }

  ngOnInit() {
  }

}
