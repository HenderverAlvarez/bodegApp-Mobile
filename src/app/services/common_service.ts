import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ModalConfirmationComponent } from '../components/commons/modal-confirmation/modal-confirmation.component';
import { ModalController } from '@ionic/angular';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'any'
})

export class CommonService {
    constructor(private http: HttpClient, private modalCtrl:ModalController, private router: Router) {}

    async openModalConfirmation(mensaje:string, icon:string){
        const modal = await this.modalCtrl.create({
            component: ModalConfirmationComponent,
            componentProps: {mensaje: mensaje, icon: icon},
            cssClass: "modal-sm"
        });
        await modal.present();
        const { data } = await modal.onWillDismiss();
        return data;
    }

    navigateTo(url:string){
        this.router.navigate([url]);
    }
}