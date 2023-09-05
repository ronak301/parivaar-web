import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ManageContactsComponent } from './manage-contacts.component';

const routes: Routes = [
  {
    path:'',
    component: ManageContactsComponent,
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
export class ManageContactsRoutingModule { }
