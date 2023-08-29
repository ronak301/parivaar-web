import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';
import { ManageCommunitiesService } from '../../services/manage-communities.service';
import { ConfirmationService } from 'primeng/api';
import { Location } from '@angular/common';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
  selector: 'app-member-detail',
  templateUrl: './member-detail.component.html',
  styleUrls: ['./member-detail.component.scss']
})
export class MemberDetailComponent implements OnInit {

  imagePreviewUrl: string = './assets/images/user.jpeg';
  addEditMemberModalDisplay: boolean = false;
  addEditFamilyMemberModalDisplay: boolean = false;
  id: any = '';
  communityId: any = '';
  data: any;
  familyMembers: any[] = [];
  isShowMore: boolean = false;
  isShowFamilyMember: boolean = false;
  isFamilyMember: boolean = false;
  relationship: any;
  relationshipId: any = ""
  // familyMemberRelationshipTypes: any;

  constructor(
    public route: ActivatedRoute,
    private commonService: CommonService,
    private communitiesService: ManageCommunitiesService,
    private confirmationService: ConfirmationService,
    private router: Router,
    private location: Location,
    public firebaseService: FirebaseService
  ) { }

  ngOnInit(): void {
    // this.familyMemberRelationshipTypes = this.firebaseService.configData.FamilyMemberRelationshipTypes;
    this.route.queryParams.subscribe((res: any) => {
      this.isFamilyMember = res?.isFamilyMember ? true : false
      this.relationship = res?.relationship ? JSON.parse(res?.relationship) : "";
      this.relationshipId = res?.relationshipId
      console.log('relationshipId', this.relationshipId)
      console.log('relationship from route', res)
    })
    this.route.params.subscribe((res: any) => {
      console.log('run route', res)
      this.isShowMore = false;
      this.communityId = res.communityId
      this.id = res.id
      this.getData()
    })
  }

  openAddEditMemberModal() {
    if (this.isFamilyMember) {
      this.addEditFamilyMemberModalDisplay = true;
    } else {
      this.addEditMemberModalDisplay = true;
    }
  }

  closeAddEditMemberModal() {
    if (this.isFamilyMember) {
      this.addEditFamilyMemberModalDisplay = false;
    } else {
      this.addEditMemberModalDisplay = false;
    }
  }

  async getData() {
    try {
      this.closeAddEditMemberModal()
      this.commonService.startLoader()
      const res: any = await this.communitiesService.getUserById(this.id)
      this.data = res.data
      if (this.isFamilyMember) {
        this.isShowFamilyMember = true;
      }
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
    } catch (err: any) {
      this.commonService.showToast('error', "Error", err?.error?.message)
      this.commonService.stopLoader()
    }
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
      accept: async () => {
        this.commonService.startLoader();
        try {
          await this.communitiesService.deleteMember(this.id)
          this.goBack()
          this.commonService.showToast("success", "Deleted", "Member Deleted!");
          this.commonService.stopLoader();
        } catch (err: any) {
          this.commonService.showToast('error', "Error", err?.error?.message)
          this.commonService.stopLoader();
        }
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

  toggleShowMore() {
    this.isShowMore = !this.isShowMore
  }

  goBack(): void {
    this.location.back();
  }

}
