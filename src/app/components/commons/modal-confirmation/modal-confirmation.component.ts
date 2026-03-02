import { Component, OnInit, Input } from '@angular/core';
import { ModalController, IonicModule } from '@ionic/angular';
import { addIcons } from 'ionicons';
import { checkmarkCircleOutline } from 'ionicons/icons';

@Component({
  selector: 'app-modal-confirmation',
  templateUrl: './modal-confirmation.component.html',
  standalone: true,
  styleUrls: ['./modal-confirmation.component.scss'],
  imports: [IonicModule]
})
export class ModalConfirmationComponent  implements OnInit {

  @Input() icon:string=""
  @Input() mensaje:string=""

  constructor() { addIcons({checkmarkCircleOutline});}

  ngOnInit() {}

}
