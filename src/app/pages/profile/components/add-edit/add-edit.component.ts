import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BloodGroups, BusinessTypes, Cities, Gender, Localities, State } from 'src/app/shared/constants/constants';
import { CommonService } from 'src/app/shared/services/common.service';
import { ProfileService } from '../../services/profile.service';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {

  id: string = '';

  imagePreviewUrl: string = './assets/images/user.jpeg';
  bloodGroupOptions: any = BloodGroups;
  genderOptions: any = Gender;
  formData!: FormGroup
  stateOptions: any = State;
  cityOptions: any = Cities;
  businessTypeOptions = BusinessTypes
  businessSubTypeOptions = []
  localityOptions = Localities;
  data: any;
  imageFile: any = null;


  constructor(
    public fb: FormBuilder,
    public commonService: CommonService,
    private profileService: ProfileService,
    private authService: AuthService,
  ) { }

  ngOnInit(): void {
    this.initializeForms()
    console.log(this.id)
    this.id = this.authService.getUserLocalData().id
    if (this.id) {
      this.getData()
    }
  }

  getData() {
    this.commonService.startLoader()
    this.profileService.getUserById(this.id).then((res: any) => {
      this.authService.setUserinLocal(res.data)
      this.data = res.data
      if (this.data?.business == null) {
        this.data['hasBusiness'] = false
      } else {
        this.data['hasBusiness'] = true
      }
      if (this.data?.profilePicture != null) {
        this.imagePreviewUrl = this.data.profilePicture
      }
      this.patchValue()
      console.log(this.data)
      this.commonService.stopLoader()
    }).catch((err: any) => {
      this.commonService.showToast('error', "Error", err)
      this.commonService.stopLoader()
    })
  }

  patchValue() {
    this.formData.patchValue(this.data)
    this.onSelectBusinessType()
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
      this.profileService.updateMember(this.id, nonNullFields, this.imageFile, this.data?.imagePath).then((res: any) => {
        console.log(res)
        this.commonService.showToast('success', 'Success', 'Updated Successful!')
        if (nonNullFields.hasBusiness) {
          if (!this.data.hasBusiness) {
            let businessData: any = nonNullFields.business;
            businessData['ownerId'] = this.id
            this.profileService.createBusiness(nonNullFields.business).then(res => {
              console.log(res)
            })
          } else {
            this.profileService.updateBusiness(this.data.business.id, nonNullFields.business).then(res => {
              console.log(res)
            })
          }
        }
        if (this.data.address.id) {
          this.profileService.updateAddress(this.data.address.id, nonNullFields.address).then(res => {
            console.log(res)
          })
        }
        this.commonService.stopLoader()
      }).catch(err => {
        this.commonService.showToast('error', "Error", err?.message)
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

}
