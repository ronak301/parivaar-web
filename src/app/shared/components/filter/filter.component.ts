import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FilterService } from './services/filter.service';
import { CommonService } from '../../services/common.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Input() type: string = 'community';
  @Input() title: string = 'Communities';
  @Input() search: any;
  @Input() communityId: any;
  @Input() currentPage: any;
  @Input() pageSize: any;
  @Output() getAllMembers = new EventEmitter<string>();

  status: any = [];
  cities: any = [];
  memberFormData!: FormGroup
  isShowOnlyAccountManager: boolean = false;

  constructor(
    public fb: FormBuilder,
    public filterService: FilterService,
    public commonService: CommonService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.initializeMemberForm()
    if (this.search) {
      this.searchData.patchValue(this.search)
      this.onSubmitMemberForm()
    }
  }

  initializeMemberForm() {
    this.memberFormData = this.fb.group({
      'search': [''],
    })
  }

  get searchData() {
    return this.memberFormData.get('search') as FormGroup;
  }

  onChangeSwitch() {
    console.log(this.isShowOnlyAccountManager)
    this.onSubmitMemberForm()
  }

  onSubmitMemberForm() {
    const queryParams = { pageSize: this.pageSize, currentPage: this.currentPage, search: this.memberFormData.value.search };
    this.router.navigate([`/pages/manage-communities/detail/${this.communityId}`], { queryParams: queryParams });
    this.commonService.startLoader()
    if (this.memberFormData.value.search) {
      this.filterService.getMemberBySearch(this.memberFormData.value.search, this.isShowOnlyAccountManager).then((res: any) => {
        this.commonService.stopLoader()
        console.log(res)
        this.getAllMembers.emit(res)
      }).catch(err => {
        this.commonService.stopLoader()
        this.commonService.showToast('error', "Error", err?.error?.message)
      })
    } else {
      this.getAllMembers.emit('clear')
      this.commonService.stopLoader()
    }
  }
  // onSubmitMemberForm() {
  //   this.commonService.startLoader()
  //   console.log(this.memberFormData.value)
  //   const nonNullFields: any = {};
  //   Object.entries(this.memberFormData.value).forEach(([key, value]) => {
  //     if (value !== null) {
  //       if (typeof value === 'object') {
  //         nonNullFields[key] = Object.entries(value).reduce((acc: any, [subKey, subValue]) => {
  //           if (subValue !== null) {
  //             acc[subKey] = subValue;
  //           }
  //           return acc;
  //         }, {});
  //       } else if (typeof value === 'string' && value.trim() === '') {
  //         delete nonNullFields[key];
  //       } else {
  //         nonNullFields[key] = value;
  //       }
  //     }
  //   });
  //   if (this.memberFormData.value.search || this.memberFormData.value.lastName || this.memberFormData.value.phone) {
  //     this.filterService.getMemberBySearch(nonNullFields).then((res: any) => {
  //       this.commonService.stopLoader()
  //       console.log(res.data.rows)
  //       this.getAllMembers.emit(res.data.rows)
  //     }).catch(err => {
  //       this.commonService.stopLoader()
  //       this.commonService.showToast('error', "Error", err?.error?.message)
  //     })
  //   } else {
  //     this.getAllMembers.emit('clear')
  //     this.commonService.stopLoader()
  //   }
  // }

}
