import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,  ReactiveFormsModule} from '@angular/forms';


import { IonicModule } from '@ionic/angular';

import { AdicionamoradaPageRoutingModule } from './adicionamorada-routing.module';

import { AdicionamoradaPage } from './adicionamorada.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    AdicionamoradaPageRoutingModule
  ],
  declarations: [AdicionamoradaPage]
})
export class AdicionamoradaPageModule {}
