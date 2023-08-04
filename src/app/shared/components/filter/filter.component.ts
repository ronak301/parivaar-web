import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FilterService } from './services/filter.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss']
})
export class FilterComponent implements OnInit {

  @Input() type: string = 'community';
  @Input() title: string = 'Communities';
  @Output() getAllMembers = new EventEmitter<string>();

  status: any = [];
  cities: any = [];
  memberFormData!: FormGroup

  constructor(
    public fb: FormBuilder,
    public filterService: FilterService,
    public commonService: CommonService
  ) { }

  ngOnInit(): void {
    this.initializeMemberForm()
  }

  initializeMemberForm() {
    this.memberFormData = this.fb.group({
      'search': [''],
    })
  }

  onSubmitMemberForm() {
    this.commonService.startLoader()
    if (this.memberFormData.value.search) {
      this.filterService.getMemberBySearch(this.memberFormData.value.search).then((res: any) => {
        this.commonService.stopLoader()
        console.log(res.data.rows)
        this.getAllMembers.emit(res.data.rows)
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
