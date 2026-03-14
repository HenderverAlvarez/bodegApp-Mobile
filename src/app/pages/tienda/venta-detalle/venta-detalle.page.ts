import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { AppHeaderComponent } from 'src/app/components/commons/app-header/app-header.component';
import {FormGroup, FormControl, Validators, FormBuilder, } from '@angular/forms';
import { addIcons } from 'ionicons';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonService } from 'src/app/services/common_service';
import { VentasService } from 'src/app/services/ventas_service';
import { UrlTree } from '@angular/router';
import { arrowBack, bagHandle, person } from 'ionicons/icons';
import { AppInputComponent } from 'src/app/components/commons/app-input/app-input.component';
import { ProductCardComponent } from 'src/app/components/commons/product-card/product-card.component';

@Component({
  selector: 'app-venta-detalle',
  templateUrl: './venta-detalle.page.html',
  styleUrls: ['./venta-detalle.page.scss'],
  standalone: true,
  imports: [ AppHeaderComponent, AppInputComponent, ProductCardComponent, CommonModule, IonicModule, FormsModule, ReactiveFormsModule]
})
export class VentaDetallePage implements OnInit {

  constructor(private commonSvc: CommonService, private ventasSvc: VentasService) {
    addIcons({arrowBack,bagHandle, person})
  }

  form: FormGroup = new FormGroup({
    nombre: new FormControl('', [Validators.required]),
    precio: new FormControl('', [Validators.required]),
    cantidad: new FormControl('', [Validators.required]),

    estado: new FormControl('', [Validators.required]),
    contacto: new FormControl('', [Validators.required]),
    cliente: new FormControl('', [Validators.required]),
    monto: new FormControl('', [Validators.required]),
    monto_usd: new FormControl('', [Validators.required]),

  });
  loading: boolean = false;
  ventaData:any = null;

  ngOnInit() {

  } 

  getinfo(){
    this.loading=true;

    const url = window.location.href;
    const urlSegments = url.split('/');
    const ventaId = urlSegments[urlSegments.length - 1];
    this.ventasSvc.getInfoVenta(ventaId).subscribe((res:any) => {
      this.loading=false;
        if(res.data){
          this.ventaData = res.data;
          this.form.controls['estado'].setValue(this.ventaData.estado)
          this.form.controls['cliente'].setValue(this.ventaData.nombre_cliente != null ? this.ventaData.nombre_cliente : "N/A")
          this.form.controls['contacto'].setValue(this.ventaData.contacto_cliente != null ? this.ventaData.contacto_cliente : 'N/A')
        }
      },
    (error:any)=>{
      this.loading=false;
      if(error.status == 401){
        this.commonSvc.closeSesionByToken();
      }
    });
  }

  goTo(url:string){
    this.commonSvc.navigateTo(url);
  }
  ionViewWillEnter(){
    this.getinfo();
  }
}
