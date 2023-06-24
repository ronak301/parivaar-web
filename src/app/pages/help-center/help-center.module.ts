import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';
import { HelpCenterComponent } from './help-center.component';
import { HelpCenterRoutingModule } from './help-center-routing.module';

@NgModule({
  declarations: [
    HelpCenterComponent
  ],
  imports: [
    SharedModule,
    HelpCenterRoutingModule
  ],
})

export class HelpCenterModule { }