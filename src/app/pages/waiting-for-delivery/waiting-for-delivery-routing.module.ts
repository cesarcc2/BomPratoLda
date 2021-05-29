import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { WaitingForDeliveryPage } from './waiting-for-delivery.page';

const routes: Routes = [
  {
    path: '',
    component: WaitingForDeliveryPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WaitingForDeliveryPageRoutingModule {}
