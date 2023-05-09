import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { TrackingDetailPage } from './tracking-detail.page';

const routes: Routes = [
  {
    path: '',
    component: TrackingDetailPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class TrackingDetailPageRoutingModule {}
