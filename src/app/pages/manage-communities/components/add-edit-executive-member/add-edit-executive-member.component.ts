import { Component, Input, OnInit, Output, EventEmitter, SimpleChanges, OnChanges } from '@angular/core';
import { CommonService } from 'src/app/shared/services/common.service';
import { ManageCommunitiesService } from '../../services/manage-communities.service';
import { BloodGroups, Gender } from 'src/app/shared/constants/constants';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-add-edit-executive-member',
  templateUrl: './add-edit-executive-member.component.html',
  styleUrls: ['./add-edit-executive-member.component.scss']
})
export class AddEditExecutiveMemberComponent implements OnInit, OnChanges {

  @Input() allExecutivesMembers: any[] = [];
  @Input() allMembers: any;
  @Input() communityId: string = '';
  @Output() onSuccess = new EventEmitter<string>();
  selectedMember: any;
  searchQuery: string = '';
  roles: string = '';
  filteredData: any[] = [];
  step: string = '1';
  selectedMemberList: any[] = [];

  constructor(
    public commonService: CommonService,
    private communitiesService: ManageCommunitiesService,
  ) { }

  ngOnChanges() {
    console.log('changes', this.allMembers)
    this.filteredData = this.allMembers
  }

  ngOnInit(): void {
    this.filteredData = this.allMembers;
    console.log('allMembers in add executive member ', this.allMembers)
  }

  applyFilter() {
    if (!this.searchQuery) {
      this.filteredData = this.allMembers;
      return;
    }

    const lowerCaseQuery = this.searchQuery.toLowerCase();
    this.filteredData = this.allMembers.filter((item: any) => {
      for (const key in item) {
        if (item.hasOwnProperty(key) && typeof item[key] === 'string') {
          if (item[key].toLowerCase().includes(lowerCaseQuery)) {
            return true;
          }
        }
      }
      return false;
    });
  }

  onSearchKeyUp() {
    if (!this.searchQuery) {
      this.filteredData = this.allMembers;
      return;
    }
  }

  onNextstep(step: string) {
    this.step = step;
    // let index = this.allExecutivesMembers.findIndex(el => el.id === this.selectedMember.id)
    // if (index != -1) {
    //   let roles = this.allExecutivesMembers[index].executive.roles
    //   roles.forEach((role: string, index: number) => {
    //     this.roles += role + `${roles.length != index + 1 ? ',' : ''}`
    //   });
    // } else {
    //   this.roles = "";
    // }
    this.roles = "";
    this.selectedMemberList.push(this.selectedMember)
  }
  
  onPreviousStep(step: string) {
    this.step = step;
    this.roles = "";
    this.selectedMemberList = []
  }
  
  reset() {
    this.step = '1';
    this.roles = "";
    this.selectedMember = ""
    this.selectedMemberList = [];
  }

  onSubmit() {
    this.commonService.startLoader();
    let roleInArray = this.roles.split(',');
    let index = this.allExecutivesMembers.findIndex(el => el.id === this.selectedMember.id)
    if (index == -1) {
      let data = {
        userId: this.selectedMember.id,
        communityId: this.communityId,
        roles: roleInArray
      }
      this.communitiesService.createExecutive(data).then(res => {
        console.log('res', res)
        this.commonService.showToast('success', 'Created!', 'Executive Member Created!')
        this.commonService.stopLoader()
        this.onSuccess.emit();
        this.reset()
      }).catch(err => {
        this.commonService.showToast('error', 'Error', err)
        this.commonService.stopLoader()
      })
    } else {
      let roleId = this.allExecutivesMembers[index].executive.id;
      let data = {
        id: roleId,
        roles: roleInArray
      };
      this.communitiesService.addRole(data).then((res: any) => {
        console.log('res', res)
        this.commonService.showToast('success', 'Updated!', res?.message);
        this.commonService.stopLoader();
        this.onSuccess.emit();
        this.reset()
      }).catch(err => {
        this.commonService.showToast('error', 'Error', err);
        this.commonService.stopLoader();
      })

      // let executiveId = this.selectedMember.id
      // this.communitiesService.updateExecutive(executiveId, roleInArray).then((res:any) => {
      //   console.log('res', res)
      //   this.commonService.showToast('success', 'Updated!', res?.message)
      //   this.commonService.stopLoader()
      //   this.onSuccess.emit();
      // }).catch(err => {
      //   this.commonService.showToast('error', 'Error', err)
      //   this.commonService.stopLoader()
      // })
    }

  }

}
