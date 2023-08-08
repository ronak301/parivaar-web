import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { BloodGroups, BusinessTypes, Cities, FamilyMemberRelationshipTypes, Gender, Localities, State } from 'src/app/shared/constants/constants';
import { CommonService } from 'src/app/shared/services/common.service';
import { ManageCommunitiesService } from '../../services/manage-communities.service';
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
  @Input() memberDetails: any;
  @Output() onSuccess = new EventEmitter<string>();

  imagePreviewUrl: string = './assets/images/user.jpeg';
  bloodGroupOptions: any;
  genderOptions: any;
  formData!: FormGroup
  stateOptions: any;
  cityOptions: any;
  businessTypeOptions: any;
  businessSubTypeOptions = [];
  familyMemberRelationshipTypes: any;
  localityOptions: any;
  imageFile: any = null;
  step: string = 'first';

  constructor(
    public fb: FormBuilder,
    public commonService: CommonService,
    private communitiesService: ManageCommunitiesService,
    public firebaseService: FirebaseService
  ) { }

  ngOnInit(): void {
    this.initializeConfigData()
    this.initializeForms()
    console.log(this.id)
    if (this.data?.profilePicture) {
      this.imagePreviewUrl = this.data?.profilePicture
    }
    console.log('this.memberDetails',this.memberDetails)
    if(this.memberDetails && !this.id) {
      console.log('mnew patch')
      this.formData.patchValue(this.memberDetails.address)
      console.log(this.formData.value)
    }
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
    this.localityOptions = this.firebaseService.configData.Localities;
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
      'dob': [null],
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
    return this.formData.get('firstName') as FormGroup
  }
  get lastName() {
    return this.formData.get('lastName') as FormGroup
  }
  get phone() {
    return this.formData.get('phone') as FormGroup
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

  onSelectFile(event: any) {
    const reader = new FileReader();
    if (event.target.files[0].size / 1024 < 1024) {
      const [file] = event.target.files;
      this.imageFile = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imagePreviewUrl = reader.result as string;
      };
    }
    else {
      this.commonService.showToast("error", "Error", "Size should be less then 1mb")
    }
  }

  onSelectBusinessType() {
    let data: any = this.businessTypeOptions.find((el: any) => el.id == this.businessType?.value)
    this.businessSubTypeOptions = data?.subTypes || []
    console.log('businessSubTypeOptions', this.businessSubTypeOptions)
  }

  onSubmit() {
    const nonNullFields: any = {};
    this.commonService.startLoader();
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
      this.communitiesService.updateMember(this.id, nonNullFields, this.imageFile, this.data?.imagePath).then((res: any) => {
        console.log(res)
        if (nonNullFields.hasBusiness) {
          if (!this.data.hasBusiness) {
            let businessData: any = nonNullFields.business;
            businessData['ownerId'] = this.id
            this.communitiesService.createBusiness(nonNullFields.business).then(res => {
              console.log(res)
              this.onSuccess.emit()
            })
          } else {
            this.communitiesService.updateBusiness(this.data.business.id, nonNullFields.business).then(res => {
              console.log(res)
              this.onSuccess.emit()
            })
          }
        }
        if (this.data.address?.id) {
          this.communitiesService.updateAddress(this.data.address.id, nonNullFields.address).then(res => {
            console.log(res)
            this.onSuccess.emit()
          })
        }
        this.commonService.showToast('success', 'Updated', 'Updated Successful!')
        this.commonService.stopLoader();
        this.onSuccess.emit()
        this.formData.reset()
      }).catch(err => {
        this.commonService.showToast('error', "Error", err?.error?.message)
        this.commonService.stopLoader()
      })
    } else {
      console.log(nonNullFields)
      console.log(this.communityId)
      this.communitiesService.addRelative(nonNullFields).then((res: any) => {
        console.log(res)
        let joinData = {
          userId: res.id
        }
        this.communitiesService.joinCommunity(joinData, this.communityId).then(res2 => {
          console.log(res2)
          let typeReverse = nonNullFields.relative.type
          console.log('typeReverse', typeReverse)
          let relationship = this.familyMemberRelationshipTypes.find((el: any) => el.id === typeReverse)
          console.log('relationship', relationship)
          if (relationship?.reverse?.id) {
            let createRelationPayload = {
              userId: res.id,
              relativeId: this.relationshipId,
              type: relationship?.reverse?.id
            }
            console.log('createRelationPayload', createRelationPayload)
            this.communitiesService.createRelation(createRelationPayload).then((res3: any) => {
              this.commonService.stopLoader()
              this.commonService.showToast('success', 'Created', 'Created Successful!')
              this.onSuccess.emit()
              this.formData.reset()
            }).catch((err: any) => {
              this.commonService.showToast('error', "Error", err?.message)
              this.commonService.stopLoader()
            })
          } else {
            this.commonService.stopLoader()
          }
        }).catch(err => {
          this.commonService.showToast('error', "Error", err?.error?.message)
          this.commonService.stopLoader()
        })

      }).catch(err => {
        this.commonService.showToast('error', "Error", err?.error?.message)
        this.commonService.stopLoader()
      })
    }
  }

  onNextStep() {
    if(!this.phone.value || this.id) {
      this.step = "second"
      return
    }
    this.commonService.startLoader()
    this.communitiesService.getMemberBySearch(this.phone.value).then((res: any) => {
      console.log(res)
      if (res?.data?.rows?.length > 0) {
        this.commonService.showToast("error","Error","Phone number already exist! Please use another phone number.")
        this.commonService.stopLoader()
        return
      } else {
        this.step = "second"
      }
      this.commonService.stopLoader()
    }).catch(err=>{
      this.commonService.showToast("error","Error",err?.error?.message)
      this.commonService.stopLoader()
    })
  }

}
