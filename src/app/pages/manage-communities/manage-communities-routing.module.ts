import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ManageCommunitiesComponent } from './manage-communities.component';
import { ListingComponent } from './components/listing/listing.component';
import { AddEditComponent } from './components/add-edit/add-edit.component';
import { DetailComponent } from './components/detail/detail.component';
import { MemberDetailComponent } from './components/member-detail/member-detail.component';

const routes: Routes = [
  {
    path:'',
    component: ManageCommunitiesComponent,
    children:[ 
      {
        path:'',
        component: ListingComponent 
      },
      {
        path:'detail/:id',
        component: DetailComponent 
      },
      {
        path:':communityId/member-detail/:id',
        component: MemberDetailComponent 
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
export class ManageCommunitiesRoutingModule { }
