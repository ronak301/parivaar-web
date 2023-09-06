import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
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
export class AddEditFamilyMemberComponent implements OnInit, OnChanges {

  @Input() id: string = '';
  @Input() relationshipId: string = '';
  @Input() communityId: any;
  @Input() data: any;
  @Input() memberDetails: any;
  @Input() relationship: any;
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
  }

  ngOnChanges() {
    this.initializeForms()
    this.initializeConfigData()
    console.log(this.data)
    if (this.data?.profilePicture) {
      this.imagePreviewUrl = this.data?.profilePicture
    }
    console.log('this.memberDetails', this.memberDetails)
    console.log('relationshipId', this.relationshipId)
    if (this.memberDetails && !this.id) {
      console.log('mnew patch', this.memberDetails.address)
      console.log(this.address.value)
      this.address.patchValue(this.memberDetails.address)
      console.log(this.formData.value)
    }
    if (this.id) {
      this.step = "second";
      this.patchValue()
    }
    if (this.relationship) {
      this.relativeType.patchValue(this.relationship.type)
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
    console.log('family member data', this.data)
    console.log('familyMemberRelationshipTypes', this.familyMemberRelationshipTypes)
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
  get address() {
    return this.formData.get('address') as FormGroup
  }
  get relativeId() {
    return this.formData.get('relative')?.get('id') as FormGroup
  }
  get relativeType() {
    return this.formData.get('relative')?.get('type') as FormGroup
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
    let data: any = this.businessTypeOptions?.length > 0 ? this.businessTypeOptions.find((el: any) => el.id == this.businessType?.value) : []
    this.businessSubTypeOptions = data?.subTypes || []
    console.log('businessSubTypeOptions', this.businessSubTypeOptions)
  }

  async onSubmit() {
    const nonNullFields: any = {};
    this.commonService.startLoader();
    console.log(this.formData.value)
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
    nonNullFields.firstName = nonNullFields.firstName.trim()
    nonNullFields.lastName = nonNullFields.lastName.trim()
    nonNullFields.fullName = nonNullFields.firstName + ' ' + nonNullFields.lastName
    if (this.id) {
      if (nonNullFields?.relative) {
        delete nonNullFields.relative
      }
      try {
        console.log(nonNullFields)
        const res = await this.communitiesService.updateMember(this.id, nonNullFields, this.imageFile, this.data?.imagePath)
        console.log(res)
        if (nonNullFields.hasBusiness) {
          if (!this.data.hasBusiness) {
            let businessData: any = nonNullFields.business;
            businessData['ownerId'] = this.id
            await this.communitiesService.createBusiness(nonNullFields.business)
          } else {
            await this.communitiesService.updateBusiness(this.data.business.id, nonNullFields.business)
          }
        }
        if (this.relativeType.value != this.relationship.type) {
          await this.communitiesService.deleteRelation(this.relationship.id)
          let typeReverse = this.relativeType.value
          let relationship = this.familyMemberRelationshipTypes.find((el: any) => el.id === typeReverse)
          let createRelationPayload = {
            userId: this.id,
            relativeId: this.relationshipId,
            type: relationship?.reverse?.id
          }
          let createRelationPayload2 = {
            userId: this.relationshipId,
            relativeId: this.id,
            type: this.relativeType.value
          }
          const promise1 = new Promise<string>(async (resolve) => {
            await this.communitiesService.createRelation(createRelationPayload)
            resolve("Async Function 1 complete");
          });
          const promise2 = new Promise<string>(async (resolve) => {
            await this.communitiesService.createRelation(createRelationPayload2)
            resolve("Async Function 1 complete");
          });
          await Promise.all([promise1, promise2])
        }
        this.commonService.showToast('success', 'Updated', 'Updated Successful!')
        this.commonService.stopLoader();
        this.formData.reset();
        this.onSuccess.emit();

        // if (this.data.address?.id) {
        //   this.communitiesService.updateAddress(this.data.address.id, nonNullFields.address).then(res => {
        //     console.log(res)
        //     this.onSuccess.emit();
        //   })
        // }
      } catch (err: any) {
        this.commonService.showToast('error', "Error", err?.error?.message)
        this.commonService.stopLoader()
      }
    } else {
      try {
        const res: any = await this.communitiesService.addRelative(nonNullFields)
        let joinData = {
          userId: res.id
        }
        await this.communitiesService.joinCommunity(joinData, this.communityId)
        let typeReverse = nonNullFields.relative.type
        let relationship = this.familyMemberRelationshipTypes.find((el: any) => el.id === typeReverse)
        if (relationship?.reverse?.id) {
          let createRelationPayload = {
            userId: res.id,
            relativeId: this.relationshipId,
            type: relationship?.reverse?.id
          }
          await this.communitiesService.createRelation(createRelationPayload)
        }
        if (nonNullFields.hasBusiness) {
          let businessData: any = nonNullFields.business;
          businessData['ownerId'] = res.id
          await this.communitiesService.createBusiness(nonNullFields.business)
          this.onSuccess.emit();
        }
        this.commonService.stopLoader()
        this.commonService.showToast('success', 'Created', 'Created Successful!')
        this.step = "first";
        this.formData.reset()
        this.onSuccess.emit()
      } catch (err: any) {
        this.commonService.showToast('error', "Error", err?.error?.message)
        this.commonService.stopLoader()
      }
    }
  }

  onNextStep() {
    if (!this.phone.value || this.id) {
      this.step = "second"
      return
    }
    this.commonService.startLoader()
    this.communitiesService.getMemberBySearch(this.phone.value).then((res: any) => {
      console.log(res)
      if (res?.data?.rows?.length > 0) {
        this.commonService.showToast("error", "Error", "Phone number already exist! Please use another phone number.")
        this.commonService.stopLoader()
        return
      } else {
        this.step = "second"
      }
      this.commonService.stopLoader()
    }).catch(err => {
      this.commonService.showToast("error", "Error", err?.error?.message)
      this.commonService.stopLoader()
    })
  }

}
