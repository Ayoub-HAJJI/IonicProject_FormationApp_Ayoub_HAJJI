import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';
import { NavController } from '@ionic/angular';

import { AngularFireAuth } from '@angular/fire/compat/auth';

@Component({
  selector: 'app-modal-component',
  templateUrl: './modal-component.component.html',
  styleUrls: ['./modal-component.component.scss'],
})
export class ModalComponentComponent implements OnInit {

  constructor(public afAuth: AngularFireAuth,private modalController: ModalController, private navController: NavController) { }

  ngOnInit() {}

  //La définition de la méthode closePopup()
  closePopup() { 

    this.modalController.dismiss();
  }

  //La définition de la méthode logout
  async logout() {

    try {

      const res = await this.afAuth.signOut();
      this.navController.navigateBack('login');
      this.modalController.dismiss();
      
    }catch(err) {

      console.dir(err);
    }
    
  }

}
