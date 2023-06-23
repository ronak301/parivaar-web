import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-members-listing',
  templateUrl: './members-listing.component.html',
  styleUrls: ['./members-listing.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MembersListingComponent implements OnInit {

  data: any = [];

  constructor(
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.data = [
      { fullName: 'Chetan Kudnekar', phoneNumber: 9999999999, roles: 'Admin', status: 'Active' },
      { fullName: 'Chetan Kudnekar', phoneNumber: 8888888888, roles: 'Super Admin', status: 'Pending' },
      { fullName: 'Chetan Kudnekar', phoneNumber: 7777777777, roles: 'User', status: 'Active' },
      { fullName: 'Chetan Kudnekar', phoneNumber: 6666666666, roles: 'Admin', status: 'Active' },
      { fullName: 'Chetan Kudnekar', phoneNumber: 5555555555, roles: 'Admin', status: 'Active' },
      { fullName: 'Chetan Kudnekar', phoneNumber: 4444444444, roles: 'Super Admin', status: 'Pending' },
      { fullName: 'Chetan Kudnekar', phoneNumber: 3333333333, roles: 'User', status: 'Active' },
      { fullName: 'Chetan Kudnekar', phoneNumber: 2222222222, roles: 'Admin', status: 'Active' },
    ]
  }

  makeAdminConfirmation() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to give administrative right to 1 users?',
      accept: () => {
        console.log('accept')
        //Actual logic to perform a confirmation
      },
      key: "makeAdminDialog"
    });
  }

  deleteMemberConfirmation() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete 2 members?',
      accept: () => {
        console.log('accept')
        //Actual logic to perform a confirmation
      },
      key: "deleteMemberDialog"
    });
  }
}
