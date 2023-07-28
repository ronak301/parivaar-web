import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PrimengModule } from './primeng.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmptyViewComponent } from './components/empty-view/empty-view.component';
import { FieldErrorComponent } from './components/field-error/field-error.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { HeaderComponent } from './components/header/header.component';
import { FilterComponent } from './components/filter/filter.component';
import { LoaderComponent } from './components/loader/loader.component';
import { BloodGroupPipe } from './pipes/blood-group.pipe';

@NgModule({
  declarations: [
    EmptyViewComponent,
    FieldErrorComponent,
    SidebarComponent,
    HeaderComponent,
    FilterComponent,
    LoaderComponent,
    BloodGroupPipe
  ],
  imports: [
    CommonModule,
    RouterModule,
    PrimengModule,
    FormsModule,
    ReactiveFormsModule
  ],
  exports: [
    CommonModule,
    PrimengModule,
    FormsModule,
    ReactiveFormsModule,
    SidebarComponent,
    HeaderComponent,
    FilterComponent,
    LoaderComponent,
    FieldErrorComponent,
    BloodGroupPipe
  ],
  providers:[
    DatePipe
  ]
})
export class SharedModule { }
