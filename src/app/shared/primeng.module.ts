import { NgModule } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { MenubarModule } from 'primeng/menubar';
import { SidebarModule } from 'primeng/sidebar';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { CardModule } from 'primeng/card';
import { TableModule } from 'primeng/table';
import { DialogModule } from 'primeng/dialog';
import { ConfirmDialogModule } from 'primeng/confirmdialog';

@NgModule({
    declarations: [

    ],
    imports: [
        ToastModule,
        MenubarModule,
        SidebarModule,
        ButtonModule,
        DropdownModule,
        CardModule,
        TableModule,
        DialogModule,
        ConfirmDialogModule
    ],
    exports: [
        ToastModule,
        MenubarModule,
        SidebarModule,
        ButtonModule,
        DropdownModule,
        CardModule,
        TableModule,
        DialogModule,
        ConfirmDialogModule
    ],
    providers: [
        ConfirmationService
    ]
})
export class PrimengModule { }
