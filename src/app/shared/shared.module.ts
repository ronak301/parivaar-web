import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PrimengModule } from './primeng.module';
import { FormsModule } from '@angular/forms';
import { EmptyViewComponent } from './components/empty-view/empty-view.component';
import { FieldErrorComponent } from './components/field-error/field-error.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';

@NgModule({
  declarations: [
    EmptyViewComponent,
    FieldErrorComponent,
    SidebarComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    PrimengModule,
    FormsModule,
  ],
  exports: [
    CommonModule,
    PrimengModule,
    FormsModule,
    SidebarComponent,
    HeaderComponent
  ],
  providers:[
    DatePipe
  ]
})
export class SharedModule { }
