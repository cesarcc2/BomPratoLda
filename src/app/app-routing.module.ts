import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'menu',
    pathMatch: 'full'
  },
  {
    path: 'menu',
    loadChildren: () => import('./pages/menu/menu.module').then( m => m.MenuPageModule)
  },
  {
    path: 'item-details',
    loadChildren: () => import('./pages/item-details/item-details.module').then( m => m.ItemDetailsPageModule)
  },
  {
    path: 'login',
    loadChildren: () => import('./pages/login/login.module').then( m => m.LoginPageModule)
  },
  {
    path: 'registo',
    loadChildren: () => import('./pages/registo/registo.module').then( m => m.RegistoPageModule)
  },
  {
    path: 'adicionamorada',
    loadChildren: () => import('./pages/adicionamorada/adicionamorada.module').then( m => m.AdicionamoradaPageModule)
  },
  {
    path: 'moradas',
    loadChildren: () => import('./pages/moradas/moradas.module').then( m => m.MoradasPageModule)
  },
  {
    path: 'pagamento',
    loadChildren: () => import('./pages/pagamento/pagamento.module').then( m => m.PagamentoPageModule)
  },
  {
    path: 'buy-resume',
    loadChildren: () => import('./pages/buy-resume/buy-resume.module').then( m => m.BuyResumePageModule)
  },
  {
    path: 'waiting-for-delivery',
    loadChildren: () => import('./pages/waiting-for-delivery/waiting-for-delivery.module').then( m => m.WaitingForDeliveryPageModule)
  }
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
