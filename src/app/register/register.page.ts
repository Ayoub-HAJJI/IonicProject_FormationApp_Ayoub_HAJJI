import { Component, OnInit } from '@angular/core';

import { AngularFireAuth } from '@angular/fire/compat/auth';

import { CheckboxChangeEventDetail, NavController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {

  //Les attributs
  username: string = "";
  password: string = "";
  cpassword: string = "";
  checkTerm: boolean;


  constructor(public afAuth: AngularFireAuth, private navController: NavController) { }

  ngOnInit() {

    this.checkTerm = false;
  }


  //La définition de la méthode d'enregistrement
  async register() {

    //Le traitement d'enregistrement
    const {username, password, cpassword} = this;
  
    if(this.checkTerm == true) {

    
      if(password !== cpassword) {

        return console.error("Veuillez confirmer de nouveau votre mot de passe");
      }
  
      try {
  
        const res = await this.afAuth.createUserWithEmailAndPassword(username, password);
        
  
      }catch(err) {
  
        console.dir(err);
      }
  
      //Le traitement d'envoie vers l'interface login
      this.navController.navigateForward('login');  
    }
    
    if(this.checkTerm == false) {

      console.log("Veuillez vérifier les termes et les conditions");
    }
    
  }

  //La définition de la méthode isChecked()
  isChecked() {

    this.checkTerm = !this.checkTerm; 
  }

}
