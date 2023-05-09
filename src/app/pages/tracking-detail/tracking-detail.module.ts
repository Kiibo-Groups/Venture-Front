import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { TrackingDetailPageRoutingModule } from './tracking-detail-routing.module';

import { TrackingDetailPage } from './tracking-detail.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    TrackingDetailPageRoutingModule
  ],
  declarations: [TrackingDetailPage]
})
export class TrackingDetailPageModule {}
