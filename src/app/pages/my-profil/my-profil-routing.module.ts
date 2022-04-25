import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { MyProfilPage } from './my-profil.page';

const routes: Routes = [
  {
    path: '',
    component: MyProfilPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MyProfilPageRoutingModule {}
