import { Component, OnInit, ViewEncapsulation, Input, Output, EventEmitter } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-family-members-listing',
  templateUrl: './family-members-listing.component.html',
  styleUrls: ['./family-members-listing.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class FamilyMembersListingComponent implements OnInit {

  @Input() data: any = [];
  @Input() relationshipId: string = '';
  @Input() communityId: string = '';
  @Output() reload = new EventEmitter<string>();

  addEditMemberModalDisplay: boolean = false;
  selectedList: any = [];

  constructor(
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
  }

  makeAdminConfirmation() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to give administrative right to 2 members?',
      accept: () => {
        console.log('accept')
        //Actual logic to perform a confirmation
      },
      key: "makeAdminDialog"
    });
  }

  deleteMemberConfirmation() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete 2 members?',
      accept: () => {
        console.log('accept')
        //Actual logic to perform a confirmation
      },
      key: "deleteMemberDialog"
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

  onUpdateSuccessful() {
    this.closeAddEditMemberModal()
    this.reload.emit()
  }
}
