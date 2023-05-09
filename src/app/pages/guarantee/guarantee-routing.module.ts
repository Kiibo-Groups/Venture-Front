import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { GuaranteePage } from './guarantee.page';

const routes: Routes = [
  {
    path: '',
    component: GuaranteePage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GuaranteePageRoutingModule {}
