import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common.service';
import { ManageCommunitiesService } from '../../services/manage-communities.service';
import { BloodGroups, Gender } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-add-edit-executive-member',
  templateUrl: './add-edit-executive-member.component.html',
  styleUrls: ['./add-edit-executive-member.component.scss']
})
export class AddEditExecutiveMemberComponent implements OnInit {

  @Input() allExecutivesMembers: string = '';
  @Input() allMembers: any;
  @Output() onSuccess = new EventEmitter<string>();
  selectedMember:any;
  
  constructor(
    public commonService: CommonService,
    private communitiesService: ManageCommunitiesService
  ) { }

  ngOnInit(): void {
    console.log('allMembers in add executive member ',this.allMembers)
  }

  onSelectMembers(data:any){

  }

  onSubmit() {
   
  }

}
