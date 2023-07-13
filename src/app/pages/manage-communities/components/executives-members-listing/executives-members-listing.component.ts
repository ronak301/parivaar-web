import { Component, Input, OnInit, ViewEncapsulation } from '@angular/core';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-executives-members-listing',
  templateUrl: './executives-members-listing.component.html',
  styleUrls: ['./executives-members-listing.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ExecutivesMembersListingComponent implements OnInit {
  
  @Input() allExecutivesMembers:any;

  addEditMemberModalDisplay: boolean = false;
  selectedList:any = [];

  constructor(
    private confirmationService: ConfirmationService
  ) { }

  ngOnInit(): void {
    // this.data = [
    //   { fullName: 'Chetan Kudnekar', phoneNumber: 9999999999, relation_type: 'Wife', status: 'Active' },
    //   { fullName: 'Chetan Kudnekar', phoneNumber: 8888888888, relation_type: 'Daughter in LAW', status: 'Pending' },
    //   { fullName: 'Chetan Kudnekar', phoneNumber: 7777777777, relation_type: 'Son in LAW', status: 'Active' },
    //   { fullName: 'Chetan Kudnekar', phoneNumber: 6666666666, relation_type: 'Spauce', status: 'Active' },
    // ]
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

}
