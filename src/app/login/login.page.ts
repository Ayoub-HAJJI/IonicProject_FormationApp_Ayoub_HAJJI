import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';
import { getAuth } from "firebase/auth";

import { NavController } from '@ionic/angular';

import { User } from '../User.interface';

import { NavparamService } from '../navparam.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  //Les attributs
  username: string = ""
  password: string = ""
  user = new User();

  constructor(public afAuth: AngularFireAuth, private navController: NavController, public navParam: NavparamService) { }

  ngOnInit() {  
  }

  //La définition de la méthode d'authentification
  async login() {

    //La décalration des variables
    const auth = getAuth();
    const utilisateur = auth.currentUser;
    const {username, password} = this;

    try {

      const res = await this.afAuth.signInWithEmailAndPassword(username, password);
      this.navController.navigateForward('liste-formations');

      //Récupérer l'id de l'utilisateur
      this.user.uid = (await this.afAuth.currentUser).uid;

      //La récupération de l'email de l'utilisateur courant
      if(utilisateur !== null && utilisateur.uid == this.user.uid) {

        this.user.email = utilisateur.email;
      } 

      //L'envoie de l'id et de l'email de l'utilisateur actuel
      this.navParam.setUserId(this.user.uid);
      this.navParam.setUserEmail(this.user.email);

      //Rendre les champs vides
      this.username = "";
      this.password = "";

    }catch(err) {

      console.dir(err);
      if(err.code === "auth/user-not-found") {

        console.log("Utilisateur introuvable");
      }
    }

  }

  //La définition de la méthode d'envoie vers l'interface login()
  register() {

    this.navController.navigateForward('register');
  }

  //La définition de la méthode de resetPassword
  async resetPassword() {

    try {

      const res = await this.afAuth.sendPasswordResetEmail(this.username);

    }catch(err) {

      console.dir(err);
    }
    
  }

}
