import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { PagesComponent } from './pages.component';
import { AuthGuardService } from '../auth/services/auth-guard.service';

const routes: Routes = [
  {
    path: '',
    component: PagesComponent,
    children: [
      {
        path: '',
        redirectTo: 'manage-communities',
        pathMatch: 'full'
      },
      {
        path: 'manage-communities',
        canActivate: [AuthGuardService],
        loadChildren: () => import('./manage-communities/manage-communities.module').then(m => m.ManageCommunitiesModule)
      },
      {
        path: 'manage-profile',
        canActivate: [AuthGuardService],
        loadChildren: () => import('./profile/profile.module').then(m => m.ProfileModule)
      },
      {
        path: 'help-center',
        loadChildren: () => import('./help-center/help-center.module').then(m => m.HelpCenterModule)
      },
      {
        path: 'about-us',
        canActivate: [AuthGuardService],
        loadChildren: () => import('./about-us/about-us.module').then(m => m.AboutUsModule)
      },
      {
        path: 'queries',
        canActivate: [AuthGuardService],
        loadChildren: () => import('./manage-contacts/manage-contacts.module').then(m => m.ManageContactsModule)
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
