import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
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
  @Output() getAllMembers = new EventEmitter<string>();

  allCommunityMembers: any = [];
  totalMembers: number = 0;

  addEditMemberModalDisplay: boolean = false;
  selectedList: any = [];
  skip: number = 0;
  limit: number = 40;
  lastPage: number = 0;

  constructor(
    private confirmationService: ConfirmationService,
    private communitiesService: ManageCommunitiesService,
    private commonService: CommonService,
  ) { }

  ngOnInit(): void {
    this.getAllCommunityMembers()
  }

  getAllCommunityMembers() {
    this.commonService.startLoader()
    this.communitiesService.getCommunityMembers(this.communityId, this.skip, this.limit).then((res: any) => {
      console.log('allCommunityMembers',res)
      this.allCommunityMembers = res?.members?.rows;
      this.totalMembers = res?.totalMembers
      this.getAllMembers.emit(this.allCommunityMembers);
      console.log(this.allCommunityMembers)
      this.commonService.stopLoader()
      this.closeAddEditMemberModal()
    }).catch(err => {
      this.commonService.showToast('error', "Error", err?.message)
      this.commonService.stopLoader()
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
    if (this.selectedList.length == 0) {
      this.selectedList.push(data)
    } else {
      let index = this.selectedList.findIndex((el: any) => el.phone === data.phone);
      if (index == -1) {
        this.selectedList.push(data)
      } else {
        this.selectedList.splice(index, 1)
      }
    }
  }

  getAllMembersByFilter(event: any) {
    if (event === 'clear') {
      this.getAllCommunityMembers()
    } else {
      this.allCommunityMembers = event
      this.getAllMembers.emit(this.allCommunityMembers)
    }
  }

  paginate(event: any) {
    console.log(event)
    if (event.page == 0) {
      this.skip = 0;
      this.limit = 40;
    } else if (event.page > this.lastPage) {
      this.skip = this.skip + 40;
      this.limit = this.skip + 40;
    } else if (event.page < this.lastPage) {
      this.skip = this.skip - 40;
      this.limit = this.skip - 40;
    }
    this.getAllCommunityMembers()
    console.log('skip', this.skip)
    console.log('limit', this.limit)
  }


}
