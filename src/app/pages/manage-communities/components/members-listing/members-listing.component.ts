import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ConfirmationService } from 'primeng/api';
import { ManageCommunitiesService } from '../../services/manage-communities.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { RowsPerPage, RowsPerPageOptions } from 'src/app/shared/constants/constants';
import { ActivatedRoute, Router } from '@angular/router';
import { Paginator } from 'primeng/paginator';

@Component({
  selector: 'app-members-listing',
  templateUrl: './members-listing.component.html',
  styleUrls: ['./members-listing.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MembersListingComponent implements OnInit {

  @Input() communityId: any;
  @Output() getAllMembers = new EventEmitter<string>();
  @ViewChild('paginator', { static: true }) paginator!: Paginator;

  data: any = [];

  addEditMemberModalDisplay: boolean = false;
  selectedList: any = [];

  cols: any[];
  rowsPerPageOptions: number[] = RowsPerPageOptions;
  pageSize: number = RowsPerPage;
  totalRecords: number = 0;
  currentPage: number = 1;
  isShowPagination: boolean = false;
  isReloaded: boolean = false;
  first!: number;
  
  constructor(
    private confirmationService: ConfirmationService,
    private communitiesService: ManageCommunitiesService,
    private commonService: CommonService,
    private router: Router,
    private route: ActivatedRoute,
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
    this.pageSize = +(this.route.snapshot.queryParamMap.get('pageSize') as any) || RowsPerPage;
    this.currentPage = +(this.route.snapshot.queryParamMap.get('currentPage') as any) || 1;
    console.log('this.pageSize', this.pageSize)
    console.log('this.currentPage', this.currentPage)
    // this.paginator.changePage(this.currentPage);
    // this.paginator.first = 0;
    // console.log('currentPage',this.paginator.currentPage())
    // this.paginator.changePage(this.currentPage)
    this.getAllCommunityMembers()
  }

  async getAllCommunityMembers() {
    try {
      const startIndex = (this.currentPage - 1) * this.pageSize;
      this.commonService.startLoader()
      const res: any = await this.communitiesService.getCommunityMembers(this.communityId, startIndex, this.pageSize)
      this.commonService.stopLoader()
      console.log('allCommunityMembers', res)
      this.data = res?.members?.rows;
      this.totalRecords = res?.members?.count;
      if (!this.isReloaded) {
        this.first = (this.currentPage - 1) * this.pageSize;
        // this.paginator.changePage(this.currentPage)
        // this.paginator.paginatorState.page = this.currentPage
        // this.paginator.paginatorState.first = this.pageSize * this.currentPage
      }
      this.isReloaded = true;
      console.log('this.paginator._page', this.paginator)
      this.getAllMembers.emit(this.data);
      this.closeAddEditMemberModal()
    } catch (err: any) {
      console.log(err)
      this.commonService.showToast('error', "Error", err?.error?.message)
      this.commonService.stopLoader()
    }
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

  onPageChange(event: any): void {
    console.log(event)
    this.pageSize = event.rows
    this.currentPage = event.page + 1;
    const queryParams = { pageSize: this.pageSize, currentPage: this.currentPage };
    this.router.navigate([`/pages/manage-communities/detail/${this.communityId}`], { queryParams: queryParams });
    this.getAllCommunityMembers()
  }

}
