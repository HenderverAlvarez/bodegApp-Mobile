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
import { CommonService } from 'src/app/services/common_service';


@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: true,
  imports: [AppInputComponent,  IonicModule, CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule]
})
export class RegisterPage implements OnInit {

  constructor(private router: Router, private authService: AuthService, private formBuilder: FormBuilder, private commonService: CommonService) { 
    addIcons({personOutline,lockClosedOutline,person,lockClosed, arrowForwardCircleOutline, arrowBack, eyeOutline});
  }
  loading:boolean=false;
  error:string="";
  profileForm = this.formBuilder.group({
    rol: ['', Validators.required],
    nombre: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    phone: ['', [Validators.required, Validators.pattern(/^[0-9]+$/), Validators.minLength(11), Validators.maxLength(11)]],
    password: [''],
    confirmPassword: [''],
    user:  ['', Validators.required],
  });
  typeActive:string='password';
  step='rol';

  ngOnInit() {
  }

  async register() {
    this.loading = true;
    this.error = "";

    let data = {
      email: this.profileForm.value.email,
      password: this.profileForm.value.password,
      usuario: this.profileForm.value.user,
      rol: this.profileForm.value.rol,
      phone: this.profileForm.value.phone,
      nombre: this.profileForm.value.nombre
    }

    this.authService.register(data).subscribe(
      (res:any)=>{
        this.loading = false;
        if(res.status_code == 200){
          this.commonService.openModalConfirmation("Registro exitoso", "checkmark-circle-outline")
          this.commonService.navigateTo("/login");
       
        }else{
          this.commonService.openModalConfirmation(res.detail, "close-circle-outline")
         
        }
      }, 
      (error:any)=>{
        this.commonService.openModalConfirmation(error.statusText, "close-circle-outline")
        this.loading = false;
        console.log("Error", error);
      });
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
  redirecTo(url: string) {
    this.router.navigateByUrl(url);
  }

  ionViewWillLeave(){
    this.profileForm.reset();
    this.error = "";
    this.loading = false;
    this.step = 'rol';
  }
}
