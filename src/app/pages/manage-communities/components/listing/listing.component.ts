import { Component, OnInit } from '@angular/core';
import { ManageCommunitiesService } from '../../services/manage-communities.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { Router, NavigationExtras } from '@angular/router';

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
    private commonService: CommonService,
    private authService: AuthService,
    private router: Router,
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

  async getAllData() {
    this.commonService.startLoader()
    if (this.authService.isSuperAdmin()) {
      try {
        const res: any = await this.communitiesService.getAllCommunities();
        this.data = res.communities;
        this.commonService.stopLoader();
      } catch (err: any) {
        this.commonService.showToast('error', "Error", err?.error?.message)
        this.commonService.stopLoader()
      }
    } else {
      // admin funcationality have to wright
      try {
        let id = this.authService.getUserLocalData().id
        const res: any = await this.communitiesService.getUserById(id)
        this.authService.setUserinLocal(res.data)
        this.data = res.data.communities || []
        this.commonService.stopLoader()
      } catch (err: any) {
        this.commonService.showToast('error', "Error", err?.error?.message)
        this.commonService.stopLoader()
      }
    }
  }

  onUpdateSuccessful() {
    this.closeAddEditCommunityModal()
    this.getAllData()
  }

  onRowClick(data: any) {
    console.log('isSuperAdmin', this.authService.isSuperAdmin())
    if (this.authService.isSuperAdmin()) {
      this.router.navigateByUrl('/pages/manage-communities/detail/' + data.id);
    } else {
      if (data.status === 'Active') {
        // const dynamicData = { status: 'Active' };
        // const navigationExtras: NavigationExtras = {
        //   state: {
        //     data: dynamicData
        //   }
        // };
        // this.router.navigate(['/pages/manage-communities/detail/' + data.id], navigationExtras);
        this.router.navigateByUrl('/pages/manage-communities/detail/' + data.id);
      } else {
        this.commonService.showToast("warn", "Warning", "Your community is in the pending state. Please wait until your community is activated.")
      }
    }
  }

}
