import { Component, OnInit } from '@angular/core';
import { IonTabs, IonTabButton, IonTabBar, IonLabel, IonIcon } from "@ionic/angular/standalone";
import { home, bag, bagOutline, clipboard } from 'ionicons/icons';
import { addIcons } from 'ionicons';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  imports: [IonIcon, IonTabBar, IonTabButton, IonTabs, IonLabel],
})
export class HomeComponent  implements OnInit {

  constructor() { 
    addIcons({home,bagOutline,bag, clipboard}); 
  }

  ngOnInit() {}

}
