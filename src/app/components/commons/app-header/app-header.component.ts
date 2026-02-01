import { Component, OnInit, Input } from '@angular/core';
import { IonHeader, IonToolbar, IonTitle, IonIcon, IonMenu, IonMenuButton, IonContent, IonButtons, IonItem, IonList, IonLabel } from "@ionic/angular/standalone";
import { personCircle, person, menu, home, settings, helpCircle, logOut } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-header',
  templateUrl: './app-header.component.html',
  styleUrls: ['./app-header.component.scss'],
  standalone: true,
  imports: [IonLabel, IonList, IonItem, IonIcon, IonHeader, IonToolbar, IonTitle,IonMenu, IonMenuButton, IonContent, IonButtons]
})
export class AppHeaderComponent  implements OnInit {

  @Input() title:string="";

  constructor() {
    addIcons({home,person,settings,helpCircle,logOut,menu,personCircle}); 
   }

  ngOnInit() {}

}
