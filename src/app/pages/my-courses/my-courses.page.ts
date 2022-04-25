import { Observable, Subscription } from 'rxjs';
import { Router, ActivatedRoute } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Component, OnInit } from '@angular/core';

import { User } from 'src/app/User.interface';
import { Formation } from 'src/app/Formation.interface';

import { NavparamService } from 'src/app/navparam.service';

import { AngularFirestore } from '@angular/fire/compat/firestore';

@Component({
  selector: 'app-my-courses',
  templateUrl: './my-courses.page.html',
  styleUrls: ['./my-courses.page.scss'],
})
export class MyCoursesPage implements OnInit {

  //Les attributs
  idUser: string;
  user = new User();
  cours = new Formation();
  myCourses: Array<Formation> = [];
  myCourses1: Array<Formation> = [];
  ids: string[] = [];
  size: number;
  subscription: Subscription = null;

  constructor(public navParam: NavparamService, public afs: AngularFirestore, public navCtrl: NavController, public router: Router, public activatedRoute: ActivatedRoute) {

  
  }

  ionViewWillEnter() {

    this.myCourses = [];
  
  }

  ngOnInit() {

    this.idUser = this.navParam.getUserId();
    this.user = this.navParam.getUserInfos(this.idUser);
    this.user.uid = this.idUser;

    /*
      - Utilisation de Subscription afin de pouvoir éxécuter ngOnInit() à chaque fois on visite la page.
      - J'ai rencontré des problèmes dans ce bout de code car je reçoie les informations multipliées par un i qui s'incrémente à chaque fois je revisite la page.
    */
    this.subscription = this.activatedRoute.params.subscribe(val => {

      this.getCourses(this.idUser);
    });

  } 

  getCourses(id: string) {

    //this.myCourses = []
    this.afs.collection('/clients').doc(id).snapshotChanges().subscribe(action => {

      if(!action.payload.metadata.hasPendingWrites) {

        this.ids = action.payload.data()['courses'];
        console.log(this.ids);
  
        for(let i = 0 ; i < this.ids.length ; i++) {

          this.afs.collection('/Formations').snapshotChanges().subscribe(actions => {

            actions.forEach(action => {

              if(action.payload.doc.data()['id'] == this.ids[i]) {
                
                this.cours.titre = action.payload.doc.data()['titre'];
                this.cours.imageLink = action.payload.doc.data()['image'];

                let course = Object.assign({}, this.cours);
                this.myCourses.push(course);

              }
              
            })
            
          })

        }
      
      }
      
    })


  }

  public ngOnDestroy(): void {
    
    this.subscription.unsubscribe();
  }

}



