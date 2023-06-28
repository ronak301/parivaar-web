import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-family-members-listing',
  templateUrl: './family-members-listing.component.html',
  styleUrls: ['./family-members-listing.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FamilyMembersListingComponent implements OnInit {
  
  data: any = [];
  addEditMemberModalDisplay: boolean = false;

  constructor(
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    this.data = [
      { fullName: 'Chetan Kudnekar', phoneNumber: 9999999999, relation_type: 'Wife', status: 'Active' },
      { fullName: 'Chetan Kudnekar', phoneNumber: 8888888888, relation_type: 'Daughter in LAW', status: 'Pending' },
      { fullName: 'Chetan Kudnekar', phoneNumber: 7777777777, relation_type: 'Son in LAW', status: 'Active' },
      { fullName: 'Chetan Kudnekar', phoneNumber: 6666666666, relation_type: 'Spauce', status: 'Active' },
    ]
  }

  makeAdminConfirmation() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to give administrative right to 2 members?',
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

  openAddEditMemberModal() {
    this.addEditMemberModalDisplay = true
  }
}