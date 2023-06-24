import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ProfileComponent } from './profile.component';
import { ProfileRoutingModule } from './profile-routing.module';
import { FamilyMembersListingComponent } from './components/family-members-listing/family-members-listing.component';
import { AddEditComponent } from './components/add-edit/add-edit.component';
import { AddEditFamilyMemberComponent } from './components/add-edit-family-member/add-edit-family-member.component';
import { DetailComponent } from './components/detail/detail.component';

@NgModule({
    declarations: [
        ProfileComponent,
        FamilyMembersListingComponent,
        AddEditComponent,
        AddEditFamilyMemberComponent,
        DetailComponent
    ],
    imports: [
        ProfileRoutingModule,
        SharedModule,
    ],
})

export class ProfileModule { }