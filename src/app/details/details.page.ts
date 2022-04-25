import { Observable } from 'rxjs';
import { Component, OnInit } from '@angular/core';

import { NavController } from '@ionic/angular';

import { AngularFirestore, DocumentChangeAction } from '@angular/fire/compat/firestore';

import { ActivatedRoute } from '@angular/router';

import { Formation } from '../Formation.interface';




@Component({
  selector: 'app-details',
  templateUrl: './details.page.html',
  styleUrls: ['./details.page.scss'],
})
export class DetailsPage implements OnInit {

  //Les attributs
  //item: any;
  idCourse: string;
  items: Observable<any[]>
  title: string;
  public cours: any;
  item: Observable<Formation>;

  course = new Formation();

  constructor(public navController: NavController,public afs: AngularFirestore, public activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {

    const idCourse: string = this.activatedRoute.snapshot.paramMap.get('id');

    this.afs.collection('Formations').snapshotChanges().subscribe(actions => {

      actions.forEach(action => {

        if(action.payload.doc.data()['id'] == idCourse) {

          //Initialisation des ressources
          this.course.id = action.payload.doc.data()['id'];
          this.course.benefits = action.payload.doc.data()['benefits'];
          this.course.description = action.payload.doc.data()['description'];
          this.course.duree = action.payload.doc.data()['duree'];
          this.course.imageLink = action.payload.doc.data()['image'];
          this.course.mentor = action.payload.doc.data()['mentor'];
          this.course.prerequis = action.payload.doc.data()['prerequis'];
          this.course.prix = action.payload.doc.data()['prix'];
          this.course.sousTitre = action.payload.doc.data()['sousTitre'];
          this.course.titre = action.payload.doc.data()['titre'];

        }
      })
    })
  }

  //La définition de la méthode subscribe()
  subscribe() {

    this.navController.navigateForward('/tabs/home');

  }
}
