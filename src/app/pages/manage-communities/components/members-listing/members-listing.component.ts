import { Component, OnInit, ViewEncapsulation, Input } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { EventEmitter } from 'stream';
import { ManageCommunitiesService } from '../../services/manage-communities.service';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-members-listing',
  templateUrl: './members-listing.component.html',
  styleUrls: ['./members-listing.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MembersListingComponent implements OnInit {

  @Input() communityId: any;
  allCommunityMembers: any = [];
  totalMembers: number = 0;

  addEditMemberModalDisplay: boolean = false;
  selectedMembersListing: any = [];

  constructor(
    private confirmationService: ConfirmationService,
    private communitiesService: ManageCommunitiesService,
    private commonService: CommonService,
  ) { }

  ngOnInit(): void {
    this.getAllCommunityMembers()
  }

  getAllCommunityMembers() {
    this.communitiesService.getCommunityMembers(this.communityId).then((res: any) => {
      this.allCommunityMembers = res.members
      this.totalMembers = res.totalMembers
      console.log(this.allCommunityMembers)
      this.closeAddEditMemberModal()
    }).catch(err => {
      this.commonService.showToast('error', "Error", err)
    })
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

  closeAddEditMemberModal() {
    this.addEditMemberModalDisplay = false
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
        this.selectedMembersListing.splice(index, 1)
      }
    }
  }


}
