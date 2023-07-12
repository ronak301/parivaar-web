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

  imagePreviewUrl:string = './assets/images/user.png';
  addEditMemberModalDisplay: boolean = false;
  id: any = '';
  data: any;

  constructor(
    public route: ActivatedRoute,
    private commonService: CommonService,
    private communitiesService: ManageCommunitiesService,
  ) { }

  ngOnInit(): void {
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
    this.commonService.startLoader()
    this.communitiesService.getUserById(this.id).then((res: any) => {
      this.data = res.data
      if(this.data?.profilePicture != null) {
        this.imagePreviewUrl = this.data.profilePicture
      }
      console.log(this.data)
      this.commonService.stopLoader()
    }).catch(err => {
      this.commonService.showToast('error', "Error", err)
      this.commonService.stopLoader()
    })
  }

}
