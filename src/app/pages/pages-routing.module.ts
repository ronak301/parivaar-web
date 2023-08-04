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
      {
        path:'manage-profile',
        loadChildren: () => import('./profile/profile.module').then( m => m.ProfileModule)
      },
      {
        path:'help-center',
        loadChildren: () => import('./help-center/help-center.module').then( m => m.HelpCenterModule)
      },
      {
        path:'about-us',
        loadChildren: () => import('./about-us/about-us.module').then( m => m.AboutUsModule)
      },
      {
        path:'privacy',
        loadChildren: () => import('./privacy/privacy.module').then( m => m.PrivacyModule)
      },
      {
        path:'terms',
        loadChildren: () => import('./terms/terms.module').then( m => m.TermsModule)
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
