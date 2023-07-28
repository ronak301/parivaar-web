import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';
import { ProfileService } from '../../services/profile.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-detail',
  templateUrl: './detail.component.html',
  styleUrls: ['./detail.component.scss']
})
export class DetailComponent implements OnInit {

  imagePreviewUrl: string = './assets/images/user.jpeg';
  id: any = '';
  data: any;
  familyMembers: any[] = [];

  constructor(
    public route: ActivatedRoute,
    private commonService: CommonService,
    private authService: AuthService,
    private profileService: ProfileService,
  ) { }

  ngOnInit(): void {
    this.id = this.authService.getUserLocalData().id
    this.getData()
  }

  getData() {
    this.commonService.startLoader()
    this.profileService.getUserById(this.id).then((res: any) => {
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
    }).catch((err: any) => {
      this.commonService.showToast('error', "Error", err)
      this.commonService.stopLoader()
    })
  }

  reload() {
    this.getData()
  }

  getCover() {
    return "url('" + this.imagePreviewUrl + "')"
  }

}
