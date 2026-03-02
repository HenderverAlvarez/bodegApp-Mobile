import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { register } from 'swiper/element/bundle';
import { AppHeaderComponent } from './components/commons/app-header/app-header.component';
register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet,AppHeaderComponent],
})
export class AppComponent {
  constructor() {}
}
