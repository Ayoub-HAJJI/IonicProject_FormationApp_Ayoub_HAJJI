import { Formation } from './../../Formation.interface';

import { Component, OnInit } from '@angular/core';

import { AngularFirestore } from '@angular/fire/compat/firestore';

import { Observable } from 'rxjs';

import { NavController } from '@ionic/angular';

import { NavparamService } from 'src/app/navparam.service';


@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})
export class HomePage implements OnInit {

  titre: string;
  items: Observable<any[]>;
  list: any[];
  list2: any;
  idCourse: any;

  constructor(public afs: AngularFirestore, public navController: NavController, public navParamService: NavparamService) { 

    
  }

  ngOnInit() {
      
    this.items = this.getFormations();
  }

  //La définition de la méthode getFormations()
  getFormations() {

    return this.afs.collection<any>('/Formations').valueChanges();
  }


}
