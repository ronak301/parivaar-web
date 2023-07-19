import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';
import { ManageCommunitiesService } from '../../services/manage-communities.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit {

  imagePreviewUrl: string = './assets/images/user.jpeg';
  addEditMemberModalDisplay: boolean = false;
  id: any = '';
  communityId: any = '';
  data: any;
  familyMembers: any[] = [];

  constructor(
    public route: ActivatedRoute,
    private commonService: CommonService,
    private communitiesService: ManageCommunitiesService,
  ) { }

  ngOnInit(): void {
    this.communityId = this.route.snapshot.paramMap.get('communityId')
    this.id = this.route.snapshot.paramMap.get('id')
    this.getData()
  }

  openAddEditMemberModal() {
    this.addEditMemberModalDisplay = true
  }

  closeAddEditMemberModal() {
    this.addEditMemberModalDisplay = false
  }

  getData() {
    this.closeAddEditMemberModal()
    this.commonService.startLoader()
    this.communitiesService.getUserById(this.id).then((res: any) => {
      this.data = res.data
      if (this.data?.business == null) {
        this.data['hasBusiness'] = false
      } else {
        this.data['hasBusiness'] = true
      }
      this.familyMembers = res.data?.relatives || []
      if (this.data?.profilePicture != null) {
        this.imagePreviewUrl = this.data.profilePicture
      }
      console.log(this.data)
      this.commonService.stopLoader()
    }).catch(err => {
      this.commonService.showToast('error', "Error", err)
      this.commonService.stopLoader()
    })
  }

  reload() {
    this.getData()
  }

}
