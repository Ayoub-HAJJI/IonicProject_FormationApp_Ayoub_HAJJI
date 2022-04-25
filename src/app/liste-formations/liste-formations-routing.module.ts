import { ListeFormationsPage } from './liste-formations.page';
import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

//La configuration des routes d'ion-tab
const routes: Routes = [

  {
    path: 'tabs',
    component: ListeFormationsPage,
    children: [
      {
        path: 'home',
        children: [
          {
            path: '',
            loadChildren: () => import('../pages/home/home.module').then( m => m.HomePageModule)
          }
        ]
      }, 
      {
        path:'my-courses',
        children: [

          {
              path: '',
              loadChildren: () => import('../pages/my-courses/my-courses.module').then( m => m.MyCoursesPageModule)
          }
        ]
      },
      {
        path:'my-profil',
        children: [

          {
              path: '',
              loadChildren: () => import('../pages/my-profil/my-profil.module').then( m => m.MyProfilPageModule)
          }
        ]
      },
    ]

  },
  {
    path: '',
    redirectTo: '/tabs/home',
    pathMatch: 'full'
  }
];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ListeFormationsPageRoutingModule {  }
