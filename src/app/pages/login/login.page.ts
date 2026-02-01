import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IonContent, IonInput, IonLabel, IonGrid, IonRow, IonCol, IonCard, IonCardContent, IonCardTitle, IonCardHeader, IonIcon } from '@ionic/angular/standalone';
import { Router } from '@angular/router';
import { addIcons } from 'ionicons';
import { person, lockClosed } from 'ionicons/icons';
import { AuthService } from 'src/services/auth_service';
import {FormGroup, FormControl, Validators, FormBuilder, } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: true,
  imports: [
    IonIcon,
    IonCardHeader,
    IonCol,
    IonRow,
    IonGrid,
    IonLabel,
    IonContent,
    CommonModule,
    FormsModule,
    IonInput,
    IonCard,
    IonCardContent,
    IonCardTitle,
    HttpClientModule,
    ReactiveFormsModule,
  ]
})
export class LoginPage implements OnInit {

  constructor(private router: Router, private authService: AuthService, private formBuilder: FormBuilder,) { 
    addIcons({person, lockClosed});
  }
  error:string="";
  profileForm = this.formBuilder.group({
    password: ['', Validators.required],
    user:  ['', Validators.required],
  });

  ngOnInit() {
  }

  async logIn() {
    let data = {
      "usuario": this.profileForm.controls.user.value,
      "password": this.profileForm.controls.password.value,
      "rol": "tienda"
    }
    this.authService.logIn(data).subscribe((response:any) => {
      if (response.status_code == 200) {
        localStorage.setItem('token', response.data.access_token);
        this.redirecTo('/inicio/home');
      } else {
        this.error = response.detail;
      }
    });
  }

  redirecTo(url: string) {
    this.router.navigateByUrl(url);
  }

  ionViewWillExit() {
    this.error = "";
    this.profileForm.reset();
  }
}
