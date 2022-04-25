import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MyProfilPageRoutingModule } from './my-profil-routing.module';

import { MyProfilPage } from './my-profil.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MyProfilPageRoutingModule
  ],
  declarations: [MyProfilPage]
})
export class MyProfilPageModule {}
