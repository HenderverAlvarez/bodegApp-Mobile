import { Component, OnInit, Input } from '@angular/core';
import { personCircle, person, menu, home, settings, helpCircle, logOut, alertCircleOutline, newspaper, closeCircle } from 'ionicons/icons';
import { addIcons } from 'ionicons';
import { AuthService } from 'src/app/services/auth_service';
import { HttpClientModule } from '@angular/common/http';
import { IonicModule } from '@ionic/angular';
import { CommonService } from 'src/app/services/common_service';
import {MenuController}  from '@ionic/angular/standalone';
import { Location } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
  standalone: true,
  imports: [ IonicModule, HttpClientModule]
})
export class AppHeaderComponent  implements OnInit {

  @Input() title:string="";
  url:string="";

  constructor(private authService:AuthService, private commonService:CommonService, private menuCtrl: MenuController, private location: Location) {
    addIcons({home,person,settings,helpCircle,logOut,menu,personCircle, alertCircleOutline, newspaper, closeCircle}); 
   }

  user:string="";
  ngOnInit() {
    this.obtenerUrlActual();

    if(this.url != "/login" && this.url != "/register"){
    this.user = this.commonService.getLocalStorage("user")?.nombre || "";
    let token = localStorage.getItem("token")
    this.authService.checkToken().then(isValid => {
      if (!isValid) {
        this.commonService.closeSesionByToken();
      }
    });
  }
  }
  
  obtenerUrlActual() {
    const urlActual = this.location.path();
    console.log('URL actual:', urlActual);
    this.url = urlActual;
  }

  closeMenu(){
    this.menuCtrl.close();
  }
  goTo(url:string){
    this.commonService.navigateTo(url);
    this.menuCtrl.close();
  }
  logout(){
    this.menuCtrl.close();
    this.commonService.clearLocalStorage();
    this.commonService.navigateTo("/login");
  }

}
