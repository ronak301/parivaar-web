import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';
import { ManageCommunitiesService } from '../../services/manage-communities.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class DetailComponent implements OnInit {

  addEditModalDisplay: boolean = false;
  id: any = '';
  data: any;
  allCommunityMembers: any = [];
  totalMembers = 0;

  constructor(
    public route: ActivatedRoute,
    private commonService: CommonService,
    private communitiesService: ManageCommunitiesService,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    this.getData()
    this.getAllCommunityMembers()
  }

  openAddEditCommunityModal() {
    this.addEditModalDisplay = true
  }

  closeAddEditCommunityModal() {
    this.addEditModalDisplay = false
  }

  getData() {
    this.commonService.startLoader()
    this.communitiesService.getCommunityById(this.id).then(res => {
      this.data = res
      console.log(this.data)
      this.commonService.stopLoader()
    }).catch(err => {
      this.commonService.showToast('error', "Error", err)
      this.commonService.stopLoader()
    })
  }

  getAllCommunityMembers() {
    this.communitiesService.getCommunityMembers(this.id).then((res: any) => {
      this.allCommunityMembers = res.members
      this.totalMembers = res.totalMembers
      console.log(this.allCommunityMembers)
    }).catch(err => {
      this.commonService.showToast('error', "Error", err)
    })
  }

  onUpdateSuccessful() {
    this.closeAddEditCommunityModal()
    this.getData()
  }
}
