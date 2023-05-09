import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { GuaranteePageRoutingModule } from './guarantee-routing.module';

import { GuaranteePage } from './guarantee.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    GuaranteePageRoutingModule
  ],
  declarations: [GuaranteePage]
})
export class GuaranteePageModule {}
