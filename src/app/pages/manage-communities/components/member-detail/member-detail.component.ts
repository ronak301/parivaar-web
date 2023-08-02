import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';
import { ManageCommunitiesService } from '../../services/manage-communities.service';
import { ConfirmationService } from 'primeng/api';

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
    private confirmationService: ConfirmationService,
    private router: Router,
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe((res:any)=>{
      console.log('run route',res)
      this.communityId = res.communityId
      this.id = res.id
      this.getData()
    })
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
      this.scrollToTop()
    }).catch(err => {
      this.commonService.showToast('error', "Error", err)
      this.commonService.stopLoader()
    })
  }

  reload(event: any) {
    if (event) {
      this.id = event
    }
    this.getData()
  }

  getCover() {
    return "url('" + this.imagePreviewUrl + "')"
  }

  deleteMemberConfirmation() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete member?',
      accept: () => {
        console.log('accept')
        this.commonService.startLoader();
        this.communitiesService.deleteMember(this.id).then(res => {
          this.router.navigateByUrl("/pages/manage-communities/detail/" + this.communityId);
          this.commonService.showToast("success", "Deleted", "Member Deleted!");
          this.commonService.stopLoader();
        }).catch(err => {
          this.commonService.showToast("error", "Error", err);
          this.commonService.stopLoader();
        })
        //Actual logic to perform a confirmation
      },
      key: "deleteMemberDialog"
    });
  }

  scrollToTop(): void {
    const scrollToTop = window.setInterval(() => {
      const pos: number = window.pageYOffset;
      if (pos > 0) {
          window.scrollTo(0, pos - 20); // how far to scroll on each step
      } else {
          window.clearInterval(scrollToTop);
      }
    }, 16);
  }

}
