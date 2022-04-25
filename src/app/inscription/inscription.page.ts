import { Component, OnInit } from '@angular/core';

import { NavController } from '@ionic/angular';

import { User } from '../User.interface';

import { NavparamService } from '../navparam.service';

import { AngularFirestore } from '@angular/fire/compat/firestore';

import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-inscription',
  templateUrl: './inscription.page.html',
  styleUrls: ['./inscription.page.scss'],
}) 
export class InscriptionPage implements OnInit {

  constructor(public navController: NavController, public navParam: NavparamService, public afs: AngularFirestore, public activatedRoute: ActivatedRoute) {
  }

  //Les attributs
  idUser: string;
  user = new User();
  idCourse: string;
  course: string[] = []
  idCourses: string[] = [];
  

  //Les attributs du formulaire HTML
  fullName: string;
  cardNumber: string;
  expirationDate: string;
  cvc: string;

  ngOnInit() {

    //La récupération des informations de l'utilisateur actuel
    this.idUser = this.navParam.getUserId();
    this.user = this.navParam.getUserInfos(this.idUser);
    this.user.uid = this.idUser;

    //La récupération de l'identifiant du cours
    this.idCourse = this.activatedRoute.snapshot.paramMap.get('id');

    //L'affichage des champs d'un utilisateur existant
    const userProfile = this.afs.collection('clients').doc(this.user.uid);
    userProfile.get().subscribe(result => {

      if(result.exists) {

        this.fullName = result.data()['nomComplet'];
        this.cardNumber = result.data()['numeroCarte'];
        this.expirationDate = result.data()['dateExpiration'];
        this.cvc = result.data()['cvc']; 
      }
    })
    
  }

  //La définition de la méthode de confirmation d'inscription
  confirmerInscription() {

    //L'ajout du client dans la base de données FireBase
    const userProfile = this.afs.collection('clients').doc(this.user.uid);

    userProfile.get().subscribe(result => {

      //La vérification de l'existence de l'utilisateur
      if(result.exists) {

        this.user.courses = result.data()['courses'];
        
        if(this.user.courses.indexOf(this.idCourse) == -1) {

          this.user.courses.push(this.idCourse);

          this.navParam.setIdCourses(this.user.courses);

          this.afs.doc(`clients/${this.user.uid}`).update({

            courses: this.user.courses,
          })
        }

        this.navController.navigateBack('/tabs/my-courses');
      
      }else {

          this.course.push(this.idCourse);
          this.navParam.setIdCourses(this.course);

          this.afs.doc(`clients/${this.user.uid}`).set({

          nomComplet: this.fullName,
          email: this.user.email,
          numeroCarte: this.cardNumber,
          dateExpiration: this.expirationDate,
          cvc: this.cvc,
          courses: this.course,
        })
        
        this.navParam.setNavData("1");

        this.navController.navigateBack('/tabs/my-courses');
      }
    })

    
  }

}
