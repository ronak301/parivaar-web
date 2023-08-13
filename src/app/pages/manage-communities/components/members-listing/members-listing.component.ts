import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ManageCommunitiesService } from '../../services/manage-communities.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { RowsPerPage, RowsPerPageOptions } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-members-listing',
  templateUrl: './members-listing.component.html',
  styleUrls: ['./members-listing.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MembersListingComponent implements OnInit {

  @Input() communityId: any;
  @Output() getAllMembers = new EventEmitter<string>();

  data: any = [];

  addEditMemberModalDisplay: boolean = false;
  selectedList: any = [];

  cols: any[];
  rowsPerPage: number = RowsPerPage;
  rowsPerPageOptions: number[] = RowsPerPageOptions;
  totalRecords: number = 0;
  firstRowIndex: number = 0;

  constructor(
    private confirmationService: ConfirmationService,
    private communitiesService: ManageCommunitiesService,
    private commonService: CommonService,
  ) {
    this.cols = [
      { field: 'firstName', header: 'Full Name' },
      { field: 'phone', header: 'Phone Number' },
      { field: 'bloodGroup', header: 'Blood Group' },
      { field: 'education', header: 'Education' },
      { field: 'business', header: 'Business' },
    ];
  }

  ngOnInit(): void {
    this.getAllCommunityMembers()
  }

  getAllCommunityMembers() {
    this.commonService.startLoader()
    this.communitiesService.getCommunityMembers(this.communityId).then((res: any) => {
      console.log('allCommunityMembers', res)
      this.data = res?.members?.rows;
      this.totalRecords = res?.members?.count;
      this.getAllMembers.emit(this.data);
      this.commonService.stopLoader()
      this.closeAddEditMemberModal()
    }).catch(err => {
      this.commonService.showToast('error', "Error", err?.error?.message)
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
      this.data = event
      this.getAllMembers.emit(this.data)
    }
  }

}
