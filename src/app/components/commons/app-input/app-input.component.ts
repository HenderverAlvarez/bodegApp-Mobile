import { Component, OnInit, Input} from '@angular/core';
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { IonIcon } from "@ionic/angular/standalone";
import { addIcons } from 'ionicons';
import { qrCodeOutline, qrCode } from 'ionicons/icons';
import { CommonModule } from '@angular/common';
@Component({
  standalone: true,
  selector: 'app-input',
  templateUrl: './app-input.component.html',
  styleUrls: ['./app-input.component.scss'],
  imports: [IonIcon, FormsModule, ReactiveFormsModule, CommonModule],
})
export class AppInputComponent  implements OnInit {

  @Input() label: string = '';
  @Input() controlName: any;
  @Input() type: string = '';
  @Input() min: string = "";
  @Input() disabled: boolean = false;
  @Input() icon: string = '';
  
  constructor() { 
    addIcons({qrCodeOutline, qrCode});
  }

  ngOnInit() {}

}
