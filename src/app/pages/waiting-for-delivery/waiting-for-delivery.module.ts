import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { WaitingForDeliveryPageRoutingModule } from './waiting-for-delivery-routing.module';

import { WaitingForDeliveryPage } from './waiting-for-delivery.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    WaitingForDeliveryPageRoutingModule
  ],
  declarations: [WaitingForDeliveryPage]
})
export class WaitingForDeliveryPageModule {}
