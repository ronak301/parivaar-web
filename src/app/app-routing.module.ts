import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardService } from './auth/services/auth-guard.service';

const routes: Routes = [
  {
    path:'',
    redirectTo:'pages',
    pathMatch:'full'
  },
  {
    path: 'auth',
    loadChildren: () => import('./auth/auth.module').then( m => m.AuthModule)
  },
  {
    path: 'pages',
    loadChildren: () => import('./pages/pages.module').then( m => m.PagesModule)
  },
  {
    path:'privacy-policy',
    loadChildren: () => import('./privacy/privacy.module').then( m => m.PrivacyModule)
  },
  {
    path:'terms-and-conditions',
    loadChildren: () => import('./terms/terms.module').then( m => m.TermsModule)
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
