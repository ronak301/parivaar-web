import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
import { ProfileComponent } from './profile.component';
import { AddEditComponent } from './components/add-edit/add-edit.component';
import { DetailComponent } from './components/detail/detail.component';

const routes: Routes = [
    {
        path: '',
        component: ProfileComponent,
        children: [
            {
                path: '',
                component: DetailComponent,
            },
            {
                path: 'edit/:id',
                component: AddEditComponent,
            }
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
export class ProfileRoutingModule { }
