import { Injectable, NgModule } from '@angular/core';

import { getAuth } from "firebase/auth";

import { User } from './User.interface';

@Injectable({
  providedIn: 'root'
})

@NgModule({

})

export class NavparamService {

  //Les attributs
  navData: any;
  idUser: string;
  emailUser: string;
  user = new User();
  idCourses: string[];

  constructor() { }

  //La définition de la méthode d'envoie des ressources
  setNavData(navObj: any) {

    this.navData = navObj;
  }

  //La définition de la méthode de récupération des ressources
  getNavData() {

    return this.navData;
  }

  //La définition des méthodes d'envoie et de la réception de l'utilisateur courant
  setUserId(idUser: string) {

    this.idUser = idUser;
  }

  getUserId() {

    return this.idUser;
  }

  //La définition des méthodes d'envoie et de réception de l'email de l'utilisateur courant
  setUserEmail(emailUser: string) {

    this.emailUser = emailUser;
  }

  getUserEmail() {

    return this.emailUser;
  }

  //La récupération des informations de l'utilisateur actuel
  getUserInfos(idUser: string): User {

    const auth = getAuth();
    const utilisateur = auth.currentUser;

    if(utilisateur !== null && utilisateur.uid == idUser) {

      this.user.email = utilisateur.email;
    }

    return this.user;
  }

  //La définition des méthodes d'envoie et de réception des identifiants de cours de l'utilisateur courant
  setIdCourses(idCoursesU: string[]) {

    this.idCourses = idCoursesU;
  }

  getIdCourses() {

    return this.idCourses;
  }
  

}
