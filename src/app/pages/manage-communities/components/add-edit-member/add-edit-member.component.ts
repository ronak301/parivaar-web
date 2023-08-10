import { Component, Input, OnInit, Output, EventEmitter, OnChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/shared/services/common.service';
import { ManageCommunitiesService } from '../../services/manage-communities.service';
import { FirebaseService } from 'src/app/shared/services/firebase.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-edit-member',
  templateUrl: './add-edit-member.component.html',
  styleUrls: ['./add-edit-member.component.scss']
})
export class AddEditMemberComponent implements OnInit, OnChanges {

  @Input() id: string = '';
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
  localityOptions: any;
  imageFile: any = null;
  step: string = 'first';

  constructor(
    public fb: FormBuilder,
    public commonService: CommonService,
    private communitiesService: ManageCommunitiesService,
    public firebaseService: FirebaseService,
    public router: Router,
  ) { }

  ngOnInit(): void {
    this.initializeConfigData()
    this.initializeForms()
    console.log(this.id)
    if (this.data?.profilePicture) {
      this.imagePreviewUrl = this.data?.profilePicture
    }
    if (this.id) {
      this.step = "second";
      this.patchValue()
    }
  }

  initializeConfigData() {
    this.bloodGroupOptions = this.firebaseService.configData.BloodGroups;
    this.genderOptions = this.firebaseService.configData.Gender;
    this.stateOptions = this.firebaseService.configData.State;
    this.cityOptions = this.firebaseService.configData.Cities;
    this.businessTypeOptions = this.firebaseService.configData.BusinessTypes;
    this.localityOptions = this.firebaseService.configData.Localities;
  }

  ngOnChanges() {
    this.initializeForms()
    console.log(this.id)
    if (this.data?.profilePicture) {
      this.imagePreviewUrl = this.data?.profilePicture
    }
    if (this.id) {
      this.patchValue()
    }
  }

  patchValue() {
    this.formData.patchValue(this.data)
    if(this.businessType?.value) {
      this.onSelectBusinessType()
    }
  }

  initializeForms() {
    this.formData = this.fb.group({
      'firstName': [null, Validators.required],
      'lastName': [null, Validators.required],
      'phone': [null, Validators.required],
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
        'state': ['Rajasthan'],
        'city': ['Udaipur'],
        'pincode': [null],
        'locality': [null],
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
    return this.formData.get('dob') as FormGroup
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

  onSubmit() {
    this.commonService.startLoader()
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
        if (this.data?.address?.id) {
          this.communitiesService.updateAddress(this.data.address.id, nonNullFields.address).then(res => {
            console.log(res)
            this.onSuccess.emit()
          })
        }
        this.commonService.stopLoader();
        this.commonService.showToast('success', 'Updated', 'Updated Successful!')
        this.step = "first";
        this.formData.reset();
        this.onSuccess.emit();
      }).catch(err => {
        this.commonService.showToast('error', "Error", err?.error?.message)
        this.commonService.stopLoader()
      })
    } else {
      console.log(nonNullFields)
      this.communitiesService.addMember(nonNullFields, this.imageFile).then((res: any) => {
        console.log(res)
        let joinData = {
          userId: res.id
        }
        this.communitiesService.joinCommunity(joinData, this.communityId).then(res2 => {
          console.log(res2)
          this.commonService.stopLoader()
          this.commonService.showToast('success', 'Created', res?.message)
          this.formData.reset()
          this.step = "first";
          this.onSuccess.emit()
          this.router.navigateByUrl(`/pages/manage-communities/${this.communityId}/member-detail/${res.id}`)
        }).catch(err => {
          console.log(err)
          this.commonService.showToast('error', "Error", err?.error?.message)
          this.commonService.stopLoader()
        })
      }).catch(err => {
        console.log(err)
        this.commonService.showToast('error', "Error", err?.error?.message)
        this.commonService.stopLoader()
      })
    }
  }

  getCover() {
    return "url('" + this.imagePreviewUrl + "')"
  }

  onSelectBusinessType() {
    let data: any = this.businessTypeOptions.find((el: any) => el.id == this.businessType?.value)
    this.businessSubTypeOptions = data?.subTypes || []
    console.log('businessSubTypeOptions', this.businessSubTypeOptions)
  }

  onNextStep() {
    if (this.id) {
      this.step = "second"
      return
    }
    this.commonService.startLoader()
    this.communitiesService.getMemberBySearch(this.phone.value).then((res: any) => {
      console.log(res)
      if (res?.data?.rows?.length > 0) {
        this.commonService.showToast("error", "Error", "Phone number already exist! Please use another phone number.")
        this.commonService.stopLoader();
        return
      } else {
        this.step = "second"
      }
      this.commonService.stopLoader();
    }).catch(err => {
      this.commonService.showToast("error", "Error", err?.error?.message)
      this.commonService.stopLoader();
    })
  }

}
