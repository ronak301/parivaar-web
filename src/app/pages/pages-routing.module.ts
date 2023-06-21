import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';

const routes: Routes = [
  {
    path:'',
    component: PagesComponent,
    children:[ 
      {
        path:'',
        redirectTo:'manage-communities',
        pathMatch:'full'
      },
      {
        path:'manage-communities',
        loadChildren: () => import('./manage-communities/manage-communities.module').then( m => m.ManageCommunitiesModule)
      },
    ]
  },
];

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  exports: [RouterModule],
})
export class PagesRoutingModule { }
