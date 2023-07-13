import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommonService } from 'src/app/shared/services/common.service';
import { ManageCommunitiesService } from '../../services/manage-communities.service';
import { BloodGroups, Gender } from 'src/app/shared/constants/constants';

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
  businessTypeOptions:any = [];
  businessSubTypeOptions:any = [];
  stateOptions:any = [];
  cityOptions:any = [];

  constructor(
    public fb: FormBuilder,
    public commonService: CommonService,
    private communitiesService: ManageCommunitiesService
  ) { }

  ngOnInit(): void {
    this.initializeForms()
    if (this.id) {
      this.patchValue()
    }
  }

  patchValue() {
    this.formData.patchValue(this.data)
  }

  initializeForms() {
    this.formData = this.fb.group({
      'firstName': ['', Validators.required],
      'lastName': ['', Validators.required],
      'phone': ['', Validators.required],
      'dob': ['', Validators.required],
      'guardianName':[''],
      'weddingDate':[''],
      'email': [''],
      'gender': [''],
      'bloodGroup': [''],
      'education': [''],
      'landline': [''],
      'nativePlace': [''],
      'business': this.fb.group({
        'name': [''],
        'type': [''],
        'subType': [''],
        'website': [''],
        'phone': [''],
        'address': [''],
        'description': [''],
      }),
      'address': this.fb.group({
        'fullAddress': [''],
        'state': [''],
        'city': [''],
        'pincode': [''],
        'locality': [''],
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
    console.log(this.formData.value)
    this.commonService.startLoader()
    if (this.id) {

      this.onSuccess.emit()
    } else {
      this.communitiesService.addMember(this.formData.value, this.communityId).then(res => {
        console.log(res)
        this.commonService.stopLoader()
        this.onSuccess.emit()
      }).catch(err => {
        this.commonService.showToast('error', "Error", err)
        this.commonService.stopLoader()
      })
    }
  }

}
