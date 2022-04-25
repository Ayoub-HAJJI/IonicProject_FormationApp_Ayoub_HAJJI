import { ModalComponentComponent } from './../modal-component/modal-component.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ListeFormationsPageRoutingModule } from './liste-formations-routing.module';

import { ListeFormationsPage } from './liste-formations.page';



@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ListeFormationsPageRoutingModule
  ],
  declarations: [ListeFormationsPage, 
    ModalComponentComponent
  ]
})
export class ListeFormationsPageModule {}
