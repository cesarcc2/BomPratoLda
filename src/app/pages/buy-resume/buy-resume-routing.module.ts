import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { BuyResumePage } from './buy-resume.page';

const routes: Routes = [
  {
    path: '',
    component: BuyResumePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuyResumePageRoutingModule {}
