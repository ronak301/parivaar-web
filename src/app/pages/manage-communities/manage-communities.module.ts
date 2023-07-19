import { NgModule } from '@angular/core';
import { ManageCommunitiesComponent } from './manage-communities.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ManageCommunitiesRoutingModule } from './manage-communities-routing.module';
import { ListingComponent } from './components/listing/listing.component';
import { AddEditComponent } from './components/add-edit/add-edit.component';
import { MembersListingComponent } from './components/members-listing/members-listing.component';
import { DetailComponent } from './components/detail/detail.component';
import { AddEditMemberComponent } from './components/add-edit-member/add-edit-member.component';
import { ExecutivesMembersListingComponent } from './components/executives-members-listing/executives-members-listing.component';
import { AddEditExecutiveMemberComponent } from './components/add-edit-executive-member/add-edit-executive-member.component';
import { MemberDetailComponent } from './components/member-detail/member-detail.component';
import { FamilyMembersListingComponent } from './components/family-members-listing/family-members-listing.component';
import { AddEditFamilyMemberComponent } from './components/add-edit-family-member/add-edit-family-member.component';

@NgModule({
  declarations: [
    ManageCommunitiesComponent,
    ListingComponent,
    AddEditComponent,
    MembersListingComponent,
    DetailComponent,
    AddEditMemberComponent,
    ExecutivesMembersListingComponent,
    AddEditExecutiveMemberComponent,
    MemberDetailComponent,
    FamilyMembersListingComponent,
    AddEditFamilyMemberComponent
  ],
  imports: [
    SharedModule,
    ManageCommunitiesRoutingModule
  ],
})

export class ManageCommunitiesModule { }