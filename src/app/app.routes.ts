import { Routes } from '@angular/router';
import { HomeComponent } from './components/home/home/home.component';
import { NewVentaPage } from './pages/tienda/new-venta/new-venta.page';

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
        path: 'tienda',
        loadComponent: () => import('./pages/tienda/tienda.page').then( m => m.TiendaPage),
        children: [
          {
            path: 'new-venta',
            loadComponent: () => import('./pages/tienda/new-venta/new-venta.page').then( m => m.NewVentaPage),
          }
        ]
      },
      {
        path: 'inventario',
        loadComponent: () => import('./pages/inventario/inventario.page').then( m => m.InventarioPage)
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
  {
    path: 'tienda',
    loadComponent: () => import('./pages/tienda/tienda.page').then( m => m.TiendaPage)
  },
  {
    path: 'new-venta',
    loadComponent: () => import('./pages/tienda/new-venta/new-venta.page').then( m => m.NewVentaPage)
  },
  {
    path: 'ventas-lista',
    loadComponent: () => import('./pages/tienda/ventas-lista/ventas-lista.page').then( m => m.VentasListaPage)
  },

];
