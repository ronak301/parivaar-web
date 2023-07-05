import { Component, OnInit } from '@angular/core';
import { ManageCommunitiesService } from '../../services/manage-communities.service';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {

  data: any = [];
  addEditModalDisplay: boolean = false;

  constructor(
    private communitiesService: ManageCommunitiesService,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.getAllData()
  }

  openAddEditCommunityModal() {
    this.addEditModalDisplay = true
  }

  closeAddEditCommunityModal() {
    this.addEditModalDisplay = false
  }

  getAllData() {
    this.commonService.startLoader()
    this.communitiesService.getAllCommunities().then((res: any) => {
      console.log(res)
      this.data = res.communities
      this.commonService.stopLoader()
    }).catch(err => {
      console.log(err)
      this.commonService.showToast('error', 'Error', err)
      this.commonService.stopLoader()
    })
  }

  onUpdateSuccessful() {
    this.closeAddEditCommunityModal()
    this.getAllData()
  }

}
