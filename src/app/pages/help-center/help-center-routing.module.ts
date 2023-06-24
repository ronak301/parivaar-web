import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { HelpCenterComponent } from './help-center.component';

const routes: Routes = [
  {
    path:'',
    component: HelpCenterComponent,
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
export class HelpCenterRoutingModule { }
