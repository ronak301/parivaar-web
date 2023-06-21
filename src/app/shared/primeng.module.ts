import { NgModule } from '@angular/core';
import { InputTextModule } from 'primeng/inputtext';
import { ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MenubarModule } from 'primeng/menubar';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';

@NgModule({
    declarations: [

    ],
    imports: [
        InputTextModule,
        ToastModule,
        MenubarModule,
        SidebarModule,
        ButtonModule,
        DropdownModule,
        CardModule
    ],
    exports: [
        InputTextModule,
        ToastModule,
        MenubarModule,
        SidebarModule,
        ButtonModule,
        DropdownModule,
        CardModule
    ],
    providers: [
        ConfirmationService
    ]
})
export class PrimengModule { }
