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
  allExecutivesMembers: any = [];
  allMembers:any = [];
  logo:string = '../../../../../assets/images/user.jpeg';

  constructor(
    public route: ActivatedRoute,
    private commonService: CommonService,
    private communitiesService: ManageCommunitiesService,
  ) { }

  ngOnInit(): void {
    this.id = this.route.snapshot.paramMap.get('id')
    this.getData()
  }

  openAddEditCommunityModal() {
    this.addEditModalDisplay = true
  }

  closeAddEditCommunityModal() {
    this.addEditModalDisplay = false
  }

  getData() {
    this.commonService.startLoader()
    this.communitiesService.getCommunityById(this.id).then((res: any) => {
      this.data = res
      if(this.data?.logo) {
        this.logo = this.data?.logo
      }
      console.log('this.data',this.data)
      this.allExecutivesMembers = res?.executives || []
      this.commonService.stopLoader()
    }).catch(err => {
      this.commonService.showToast('error', "Error", err?.error?.message)
      this.commonService.stopLoader()
    })
  }

  onUpdateSuccessful() {
    this.closeAddEditCommunityModal()
    this.getData()
  }

  getAllMembers(event:any) {
    console.log('event',event)
    this.allMembers = event
  }

  getCover() {
    return "url('" + this.logo + "')"
  }

}
