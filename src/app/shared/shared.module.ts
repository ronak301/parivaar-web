import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PrimengModule } from './primeng.module';
import { FormsModule } from '@angular/forms';
import { EmptyViewComponent } from './components/empty-view/empty-view.component';
import { FieldErrorComponent } from './components/field-error/field-error.component';

@NgModule({
  declarations: [
    EmptyViewComponent,
    FieldErrorComponent
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
  ],
  providers:[
    DatePipe
  ]
})
export class SharedModule { }
