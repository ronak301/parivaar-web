import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { BloodGroups, BusinessTypes, Cities, FamilyMemberRelationshipTypes, Gender, State } from 'src/app/shared/constants/constants';
import { CommonService } from 'src/app/shared/services/common.service';
import { ProfileService } from '../../services/profile.service';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
  selector: 'app-add-edit-family-member',
  templateUrl: './add-edit-family-member.component.html',
  styleUrls: ['./add-edit-family-member.component.scss']
})
export class AddEditFamilyMemberComponent implements OnInit {

  @Input() id: string = '';
  @Input() relationshipId: string = '';
  @Input() communityId: any;
  @Input() data: any;
  @Output() onSuccess = new EventEmitter<string>();

  imagePreviewUrl: string = './assets/images/user.jpeg';
  bloodGroupOptions: any;
  genderOptions: any;
  formData!: FormGroup
  stateOptions: any;
  cityOptions: any;
  businessTypeOptions: any;
  businessSubTypeOptions = []
  familyMemberRelationshipTypes: any;

  constructor(
    public fb: FormBuilder,
    public commonService: CommonService,
    private profileService: ProfileService,
    public firebaseService: FirebaseService
  ) { }

  ngOnInit(): void {
    this.initializeConfigData()
    this.initializeForms()
    console.log(this.id)
    if (this.id) {
      this.patchValue()
    }
  }

  initializeConfigData() {
    this.bloodGroupOptions = this.firebaseService.configData.BloodGroups;
    this.genderOptions = this.firebaseService.configData.Gender;
    this.stateOptions = this.firebaseService.configData.State;
    this.cityOptions = this.firebaseService.configData.Cities;
    this.businessTypeOptions = this.firebaseService.configData.BusinessTypes;
    this.familyMemberRelationshipTypes = this.firebaseService.configData.FamilyMemberRelationshipTypes;
  }

  patchValue() {
    this.formData.patchValue(this.data)
    this.onSelectBusinessType()
  }

  initializeForms() {
    this.formData = this.fb.group({
      'firstName': [null, Validators.required],
      'lastName': [null, Validators.required],
      'phone': [null],
      'dob': [null, Validators.required],
      'hasBusiness': [false],
      'guardianName': [null],
      'weddingDate': [null],
      'email': [null],
      'gender': [null],
      'bloodGroup': [null],
      'education': [null],
      'landline': [null],
      'nativePlace': [null],
      "isAccountManager": [false],
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
        'state': ['Rajasthan'],
        'city': ['Udaipur'],
        'pincode': [null],
        'locality': [null],
      }),
      'relative': this.fb.group({
        'id': [this.relationshipId],
        'type': [null, Validators.required],
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
  get hasBusiness() {
    return this.formData.get('hasBusiness') as FormGroup
  }
  get businessType() {
    return this.formData.get('business')?.get('type') as FormGroup
  }

  onSelectBusinessType() {
    let data: any = this.businessTypeOptions.find((el: any) => el.id == this.businessType?.value)
    this.businessSubTypeOptions = data?.subTypes || []
    console.log('businessSubTypeOptions', this.businessSubTypeOptions)
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
      this.profileService.updateMember(this.id, nonNullFields).then((res: any) => {
        console.log(res)
        if (nonNullFields.hasBusiness) {
          this.profileService.updateBusiness(this.data.business.id, nonNullFields.business).then(res => {
            console.log(res)
            this.onSuccess.emit()
          })
        }
        // if (this.data.address.id) {
        //   this.communitiesService.updateAddress(this.data.address.id, nonNullFields.address).then(res=>{
        //     console.log(res)
        //     this.onSuccess.emit()
        //   })
        // }
        this.onSuccess.emit()
      }).catch(err => {
        this.commonService.showToast('error', "Error", err?.error?.message)
        this.commonService.stopLoader()
      })
    } else {
      console.log(nonNullFields)
      console.log(this.communityId)
      this.profileService.addRelative(nonNullFields).then((res: any) => {
        console.log(res)
        let joinData = {
          userId: res.id
        }
        this.profileService.joinCommunity(joinData, this.communityId).then(res2 => {
          console.log(res2)
          this.commonService.stopLoader()
          this.onSuccess.emit()
        }).catch(err => {
          this.commonService.showToast('error', "Error", err?.error?.message)
          this.commonService.stopLoader()
        })
      }).catch(err => {
        this.commonService.showToast('error', "Error", err?.error?.message)
        this.commonService.stopLoader()
      })
    }
    this.formData.reset()
  }

}

