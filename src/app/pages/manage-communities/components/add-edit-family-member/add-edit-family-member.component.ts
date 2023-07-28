import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { BloodGroups, BusinessSubTypes, BusinessTypes, Cities, FamilyMemberRelationshipTypes, Gender, State } from 'src/app/shared/constants/constants';
import { CommonService } from 'src/app/shared/services/common.service';
import { ManageCommunitiesService } from '../../services/manage-communities.service';

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
  bloodGroupOptions: any = BloodGroups;
  genderOptions: any = Gender;
  formData!: FormGroup
  stateOptions: any = State;
  cityOptions: any = Cities;
  businessTypeOptions = BusinessTypes
  businessSubTypeOptions = BusinessSubTypes
  familyMemberRelationshipTypes = FamilyMemberRelationshipTypes
  localityOptions = [];
  imageFile: any = null;

  constructor(
    public fb: FormBuilder,
    public commonService: CommonService,
    private communitiesService: ManageCommunitiesService
  ) { }

  ngOnInit(): void {
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

  onSelectFile(event: any) {
    const reader = new FileReader();
    if (event.target.files[0].size / 1024 < 500) {
      const [file] = event.target.files;
      this.imageFile = event.target.files[0];
      reader.readAsDataURL(file);
      reader.onload = () => {
        this.imagePreviewUrl = reader.result as string;
      };
    }
    else {
      this.commonService.showToast("error", "Error", "Size should be less then 500kb!")
    }
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
        if (this.data.address.id) {
          this.communitiesService.updateAddress(this.data.address.id, nonNullFields.address).then(res => {
            console.log(res)
            this.onSuccess.emit()
          })
        }
        this.commonService.showToast('success', 'Updated', 'Updated Successful!')
        this.commonService.stopLoader();
        this.onSuccess.emit()
      }).catch(err => {
        this.commonService.showToast('error', "Error", err?.message)
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
          this.commonService.stopLoader()
          this.commonService.showToast('success', 'Created', 'Created Successful!')
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
    this.formData.reset()
  }

}
