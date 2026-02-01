import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home/home.component';
export const routes: Routes = [
  {
    path: 'inicio',
    component: HomeComponent,
    children: [
      {
        path: 'home',
        loadComponent: () => import('./pages/home/home.page').then( m => m.HomePage),
      },
      {
        path: '',
        redirectTo: '/inicio/home',
        pathMatch: 'full', 
      },
    ],
  },
  
  {
    path: '',
    pathMatch: 'full',
    redirectTo: '/login',
  },


  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.page').then( m => m.LoginPage)
  },
];
