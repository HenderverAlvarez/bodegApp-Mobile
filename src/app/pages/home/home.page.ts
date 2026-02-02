import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { IonContent, IonLabel, IonCardContent, IonCard } from '@ionic/angular/standalone';
import { AppHeaderComponent } from 'src/app/components/commons/app-header/app-header.component';
import { IonCol, IonGrid, IonRow } from '@ionic/angular/standalone';
import { HomeButtonsComponent } from 'src/app/components/home/home-buttons/home-buttons.component';
@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
  standalone: true,
  imports: [IonCard, IonCardContent, AppHeaderComponent, IonContent, CommonModule, FormsModule, IonCol, IonGrid, IonRow,HomeButtonsComponent]
})
export class HomePage implements OnInit {

  date: string = new Intl.DateTimeFormat('en-GB').format(new Date());
  constructor() {
  }


  ngOnInit() {
  }

}
