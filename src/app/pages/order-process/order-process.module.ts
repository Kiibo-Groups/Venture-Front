import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { OrderProcessPageRoutingModule } from './order-process-routing.module';

import { OrderProcessPage } from './order-process.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    OrderProcessPageRoutingModule
  ],
  declarations: [OrderProcessPage]
})
export class OrderProcessPageModule {}
