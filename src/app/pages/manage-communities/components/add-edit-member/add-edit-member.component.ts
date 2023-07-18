import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/shared/services/common.service';
import { ManageCommunitiesService } from '../../services/manage-communities.service';
import { BloodGroups, BusinessSubTypes, BusinessTypes, Cities, Gender, State } from 'src/app/shared/constants/constants';

@Component({
  selector: 'app-add-edit-member',
  templateUrl: './add-edit-member.component.html',
  styleUrls: ['./add-edit-member.component.scss']
})
export class AddEditMemberComponent implements OnInit {

  @Input() id: string = '';
  @Input() communityId: any;
  @Input() data: any;
  @Output() onSuccess = new EventEmitter<string>();

  imagePreviewUrl: string = './assets/images/user.jpeg';
  bloodGroupOptions: any = BloodGroups;
  genderOptions: any = Gender;
  formData!: FormGroup
  stateOptions: any = State;
  cityOptions: any = Cities;
  businessTypeOptions = BusinessTypes
  businessSubTypeOptions = BusinessSubTypes

  constructor(
    public fb: FormBuilder,
    public commonService: CommonService,
    private communitiesService: ManageCommunitiesService
  ) { }

  ngOnInit(): void {
    this.initializeForms()
    console.log(this.id)
    if (this.id) {
      this.patchValue()
    }
  }

  patchValue() {
    this.formData.patchValue(this.data)
  }

  initializeForms() {
    this.formData = this.fb.group({
      'firstName': [null, Validators.required],
      'lastName': [null, Validators.required],
      'phone': [null, Validators.required],
      'dob': [null, Validators.required],
      'guardianName': [null],
      'weddingDate': [null],
      'email': [null],
      'gender': [null],
      'bloodGroup': [null],
      'education': [null],
      'landline': [null],
      'nativePlace': [null],
      "isAccountManager": [true],
      "isSuperAdmin": [false],
      'business': this.fb.group({
        'name': [null],
        'type': [null],
        'subType': [null],
        'website': [null],
        'phone': [null],
        'address': [null],
        'description': [null],
      }),
      'address': this.fb.group({
        'fullAddress': [null],
        'state': [null],
        'city': [null],
        'pincode': [null],
        'locality': [null],
      }),
    })
  }

  get firstName() {
    return this.formData.get('firstName')
  }
  get lastName() {
    return this.formData.get('lastName')
  }
  get phone() {
    return this.formData.get('phone')
  }
  get dob() {
    return this.formData.get('dob')
  }

  onSubmit() {
    const nonNullFields: any = {};
    Object.entries(this.formData.value).forEach(([key, value]) => {
      if (value !== null) {
        if (typeof value === 'object') {
          nonNullFields[key] = Object.entries(value).reduce((acc: any, [subKey, subValue]) => {
            if (subValue !== null) {
              acc[subKey] = subValue;
            }
            return acc;
          }, {});
        } else if (typeof value === 'string' && value.trim() === '') {
          delete nonNullFields[key];
        } else {
          nonNullFields[key] = value;
        }
      }
    });
    if (this.id) {
      console.log(nonNullFields)
      this.communitiesService.updateMember(this.id, nonNullFields).then((res: any) => {
        console.log(res)
        this.onSuccess.emit()
      }).catch(err => {
        this.commonService.showToast('error', "Error", err?.message)
        this.commonService.stopLoader()
      })
    } else {
      console.log(nonNullFields)
      this.communitiesService.addMember(nonNullFields, this.communityId).then((res: any) => {
        console.log(res)
        let joinData = {
          userId: res.id
        }
        this.communitiesService.joinCommunity(joinData, this.communityId).then(res2 => {
          console.log(res2)
          this.commonService.stopLoader()
          this.onSuccess.emit()
        }).catch(err => {
          this.commonService.showToast('error', "Error", err?.message)
          this.commonService.stopLoader()
        })
      }).catch(err => {
        this.commonService.showToast('error', "Error", err?.message)
        this.commonService.stopLoader()
      })
    }
  }

}
