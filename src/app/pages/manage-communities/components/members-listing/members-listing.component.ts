import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-members-listing',
  templateUrl: './members-listing.component.html',
  styleUrls: ['./members-listing.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MembersListingComponent implements OnInit {

  @Input() allCommunityMembers: any;
  @Input() totalMembers: number = 0;
  @Input() communityId: any;
  addEditMemberModalDisplay: boolean = false;
  selectedMembersListing: any = [];

  constructor(
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
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

  onSelectMembers(data: any) {
    console.log(data)
    if (this.selectedMembersListing.length > 0) {
      this.selectedMembersListing.push(data)
    } else {
      let index = this.selectedMembersListing.findIndex((el: any) => el.phone === data.phone);
      if (index == -1) {
        this.selectedMembersListing.push(data)
      } else {
        this.selectedMembersListing.splice(index,1)
      }
    }
  }
}
