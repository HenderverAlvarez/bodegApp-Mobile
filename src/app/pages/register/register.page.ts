import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { IonicModule } from '@ionic/angular';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth_service';
import { addIcons } from 'ionicons';
import { arrowBack, arrowForwardCircleOutline, eyeOutline, lockClosed, lockClosedOutline, person, personOutline } from 'ionicons/icons';
import { AppInputComponent } from 'src/app/components/commons/app-input/app-input.component';
import { HttpClientModule } from '@angular/common/http';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [AppInputComponent,  IonicModule, CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule]
})
export class RegisterPage implements OnInit {

  constructor(private router: Router, private authService: AuthService, private formBuilder: FormBuilder,) { 
    addIcons({personOutline,lockClosedOutline,person,lockClosed, arrowForwardCircleOutline, arrowBack, eyeOutline});
  }
  loading:boolean=false;
  error:string="";
  profileForm = this.formBuilder.group({
    rol: ['', Validators.required],
    nombre: ['', Validators.required],
    email: ['', Validators.required],
    phone: ['', Validators.required],
    password: [''],
    confirmPassword: [''],
    user:  ['', Validators.required],
  });
  typeActive:string='password';
  step='rol';

  ngOnInit() {
  }

  setRol(rol:string){
    this.profileForm.controls.rol.setValue(rol);
    this.nextStep()
  }

  toglePass(){
    this.typeActive = this.typeActive === 'password' ? 'text' : 'password';
  }
  nextStep(){
    switch (this.step) {
      case 'rol':
      this.step = 'datos';
      break;
      case 'datos':
      this.step = 'contraseña';
      break;
      default:
      console.warn(`Unhandled step: ${this.step}`);
    }
  }
  prevStep(){
    if (this.step === 'contraseña') {
      this.step = 'datos';
    } else if (this.step === 'datos') {
      this.profileForm.reset();
      this.step = 'rol';
    }
  }

  async logIn() {

  }
  redirecTo(url: string) {
    this.router.navigateByUrl(url);
  }
}
