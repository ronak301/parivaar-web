import { Component, Input, OnInit, ViewEncapsulation, Output, EventEmitter } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-executives-members-listing',
  templateUrl: './executives-members-listing.component.html',
  styleUrls: ['./executives-members-listing.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ExecutivesMembersListingComponent implements OnInit {

  @Input() allExecutivesMembers: any;
  @Input() allMembers: any;
  @Input() communityId: any;
  @Output() requestReload = new EventEmitter<string>();

  addEditMemberModalDisplay: boolean = false;
  selectedList: any = [];

  constructor(
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    console.log('allMembers in executive member listing', this.allMembers)
  }

  makeAdminConfirmation() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to give administrative right to 2 members?',
      accept: () => {
        console.log('accept')
        //Actual logic to perform a confirmation
      },
      key: "makeExecutiveAdminDialog"
    });
  }

  deleteMemberConfirmation() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete 2 members?',
      accept: () => {
        console.log('accept')
        //Actual logic to perform a confirmation
      },
      key: "deleteExecutiveMemberDialog"
    });
  }

  openAddEditMemberModal() {
    this.addEditMemberModalDisplay = true
  }

  closeAddEditMemberModal() {
    this.addEditMemberModalDisplay = false
  }

  onSelectMembers(data: any) {
    console.log(data)
    if (this.selectedList.length == 0) {
      this.selectedList.push(data)
    } else {
      let index = this.selectedList.findIndex((el: any) => el.phone === data.phone);
      if (index == -1) {
        this.selectedList.push(data)
      } else {
        this.selectedList.splice(index, 1)
      }
    }
  }

  reload() {
    this.closeAddEditMemberModal()
    this.requestReload.emit()
  }

}
