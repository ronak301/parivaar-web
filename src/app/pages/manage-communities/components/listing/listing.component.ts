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

  getAllData() {
    this.commonService.startLoader()
    console.log('isSuperAdmin', this.authService.isSuperAdmin())
    if (this.authService.isSuperAdmin()) {
      this.communitiesService.getAllCommunities().then((res: any) => {
        console.log(res)
        this.data = res.communities
        this.commonService.stopLoader()
      }).catch(err => {
        console.log(err)
        this.commonService.showToast('error', "Error", err?.error?.message)
        this.commonService.stopLoader()
      })
    } else {
      // admin funcationality have to wright
      let id = this.authService.getUserLocalData().id
      this.communitiesService.getUserById(id).then((res: any) => {
        console.log('single User', res)
        this.authService.setUserinLocal(res.data)
        this.data = res.data.communities || []
        this.commonService.stopLoader()
      }).catch(err => {
        this.commonService.showToast('error', "Error", err?.error?.message)
        this.commonService.stopLoader()
      })
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
