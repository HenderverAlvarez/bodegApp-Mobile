import { Component } from '@angular/core';
import { IonApp, IonRouterOutlet } from '@ionic/angular/standalone';
import { register } from 'swiper/element/bundle';
import { AppHeaderComponent } from './components/commons/app-header/app-header.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

register();

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  imports: [IonApp, IonRouterOutlet,AppHeaderComponent,HttpClientModule],
})
export class AppComponent {
  constructor() {}
}
