import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { person, lockClosed, personOutline, lockClosedOutline } from 'ionicons/icons';
import { AuthService } from 'src/app/services/auth_service';
import {FormGroup, FormControl, Validators, FormBuilder, } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppInputComponent } from 'src/app/components/commons/app-input/app-input.component';
import { IonicModule } from '@ionic/angular';
import { CommonService } from 'src/app/services/common_service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    AppInputComponent,
    CommonModule,
    FormsModule,
    IonicModule,
    HttpClientModule,
    ReactiveFormsModule,
  ]
})
export class LoginPage implements OnInit {

  constructor(private router: Router, private authService: AuthService, private formBuilder: FormBuilder, private commonService: CommonService) { 
    addIcons({personOutline,lockClosedOutline,person,lockClosed});
  }
  loading:boolean=false;
  error:string="";
  profileForm = this.formBuilder.group({
    password: ['', Validators.required],
    user:  ['', Validators.required],
  });

  ngOnInit() {
    this.commonService.clearLocalStorage();
    this.profileForm.reset()
  }

  async logIn() {
    this.loading = true;
    let data = {
      "usuario": this.profileForm.controls.user.value,
      "password": this.profileForm.controls.password.value,
      "rol": "tienda"
    }  
      this.authService.logIn(data).subscribe((response:any) => {
        this.loading = false;
        if (response.status_code == 200) {
          this.commonService.setLocalStorage('user', response.data.data_user);
          this.commonService.setLocalStorage('token', response.data.access_token);
          this.commonService.navigateTo('/inicio/home');
        } else {
          this.error = response.detail;
        }
      },
      (error:any) =>{
        this.loading = false;
        this.error = "Error de conexión con el servidor";
      }
      );    
  }

  goTo(url:string){
    this.router.navigate([url]);
  }

  ionViewWillChange(){
    this.profileForm.reset();
  }

  ionViewWillExit() {
    this.error = "";
    this.profileForm.reset();
  }
}
