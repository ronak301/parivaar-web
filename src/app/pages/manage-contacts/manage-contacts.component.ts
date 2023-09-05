import { Component, OnInit } from '@angular/core';
import { ManageContactsService } from './service/manage-contacts.service';
import { CommonService } from 'src/app/shared/services/common.service';
import { RowsPerPage, RowsPerPageOptions } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-manage-contacts',
  templateUrl: './manage-contacts.component.html',
  styleUrls: ['./manage-contacts.component.scss']
})
export class ManageContactsComponent implements OnInit {

  public data: any = [];
  public cols: any = [
    { field: 'name', header: 'Full Name' },
    { field: 'message', header: 'Message' },
    { field: 'organisationName', header: 'Organisation Name' },
    { field: 'timestamp', header: 'Time' },
  ];
  rowsPerPageOptions: number[] = RowsPerPageOptions;
  pageSize: number = RowsPerPage;

  constructor(
    private manageContactsService: ManageContactsService,
    private commonService: CommonService
  ) { }

  ngOnInit(): void {
    // this.getAll()
  }

  async getAll() {
    this.commonService.startLoader();
    try {
      const res = await this.manageContactsService.getAllData()
      console.log(res)
      this.data = res
      this.commonService.stopLoader();
    } catch (err: any) {
      this.commonService.showToast("Error", "Error", err)
      this.commonService.stopLoader();
    }
  }

}
