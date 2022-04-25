import { ModalComponentComponent } from './../modal-component/modal-component.component';
import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';

import { NavController } from '@ionic/angular';

import { ModalController } from '@ionic/angular';

@Component({
  selector: 'app-liste-formations',
  templateUrl: './liste-formations.page.html',
  styleUrls: ['./liste-formations.page.scss'],
})
export class ListeFormationsPage implements OnInit {

  constructor(public afAuth: AngularFireAuth, private navController: NavController, private modalController: ModalController) { }

  ngOnInit() {
  }






}
