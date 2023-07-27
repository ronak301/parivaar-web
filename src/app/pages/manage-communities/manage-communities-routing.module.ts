import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ManageCommunitiesComponent } from './manage-communities.component';
import { ListingComponent } from './components/listing/listing.component';
import { AddEditComponent } from './components/add-edit/add-edit.component';
import { DetailComponent } from './components/detail/detail.component';
import { MemberDetailComponent } from './components/member-detail/member-detail.component';
// import { CommunityPendingStateGuardService } from './services/community-pending-state-guard.service';

const routes: Routes = [
  {
    path:'',
    component: ManageCommunitiesComponent,
    children:[ 
      {
        path:'',
        // canActivate: [CommunityPendingStateGuardService],
        component: ListingComponent 
      },
      {
        path:'detail/:id',
        // canActivate: [CommunityPendingStateGuardService],
        component: DetailComponent 
      },
      {
        path:':communityId/member-detail/:id',
        // canActivate: [CommunityPendingStateGuardService],
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
