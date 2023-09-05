import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { ManageContactsComponent } from './manage-contacts.component';
import { ManageContactsRoutingModule } from './manage-contacts-routing.module';
import { DatePipe } from '@angular/common';

@NgModule({
  declarations: [
    ManageContactsComponent
  ],
  imports: [
    SharedModule,
    ManageContactsRoutingModule
  ],
  providers: [
    DatePipe
  ]
})

export class ManageContactsModule { }