import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { BuyResumePageRoutingModule } from './buy-resume-routing.module';

import { BuyResumePage } from './buy-resume.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    BuyResumePageRoutingModule
  ],
  declarations: [BuyResumePage]
})
export class BuyResumePageModule {}
