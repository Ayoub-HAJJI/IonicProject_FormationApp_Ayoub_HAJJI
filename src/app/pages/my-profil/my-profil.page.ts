import { Component, OnInit } from '@angular/core';

import { ModalController } from '@ionic/angular';

import { AngularFireAuth } from '@angular/fire/compat/auth';


import { ModalComponentComponent } from 'src/app/modal-component/modal-component.component';

import { User } from 'src/app/User.interface';

import { NavparamService } from 'src/app/navparam.service';

import { AngularFirestore } from '@angular/fire/compat/firestore';


@Component({
  selector: 'app-my-profil',
  templateUrl: './my-profil.page.html',
  styleUrls: ['./my-profil.page.scss'],
})
export class MyProfilPage implements OnInit {

  //Les attributs
  idUser: string;
  user = new User();

  constructor(private modalController: ModalController, public navParam: NavparamService, public afAuth: AngularFireAuth, public afs: AngularFirestore) {

  }

  ngOnInit() {

    this.idUser = this.navParam.getUserId();
    this.user = this.navParam.getUserInfos(this.idUser);
    this.user.uid = this.idUser;

    this.afs.collection('clients').snapshotChanges().subscribe(actions => {
  
      actions.forEach(action => {

        if(action.payload.doc.data()['email'] == this.user.email) {

          this.user.fullName = action.payload.doc.data()['nomComplet'];

        }
      })
    
    })
  }

  //La définition du popUp
  openModal() { 

    this.modalController.create({component: ModalComponentComponent, cssClass: "my-modal-component-css"}).then((modalElement) => {

      modalElement.present();
    })
  }

  //La méthode pour retourner le nom d'utilisateur
    //La méthode searchUserByEmail(email: string)
    // searchUserByEmail(email: string): string {

    //   let nomUser: string;

    //   this.afs.collection('clients').snapshotChanges().subscribe(actions => {
  
    //     actions.forEach(action => {
  
    //       if(action.payload.doc.data()['email'] == email) {

    //         nomUser = action.payload.doc.data()['nomComplet'];

    //       }
    //     })
      
    //   })
    //   return nomUser;
    // }

}
