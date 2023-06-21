import { NgModule } from '@angular/core';
import { ManageCommunitiesComponent } from './manage-communities.component';
import { SharedModule } from 'src/app/shared/shared.module';
import { ManageCommunitiesRoutingModule } from './manage-communities-routing.module';
import { ListingComponent } from './components/listing/listing.component';
import { AddEditComponent } from './components/add-edit/add-edit.component';
import { MembersListingComponent } from './components/members-listing/members-listing.component';

@NgModule({
  declarations: [
    ManageCommunitiesComponent,
    ListingComponent,
    AddEditComponent,
    MembersListingComponent,
  ],
  imports: [
    SharedModule,
    ManageCommunitiesRoutingModule
  ],
})

export class ManageCommunitiesModule { }