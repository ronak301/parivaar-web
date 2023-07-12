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

  imagePreviewUrl: string = './assets/images/user.png';
  bloodGroupOptions: any = BloodGroups;
  genderOptions: any = Gender;
  formData!: FormGroup

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
      'email': ['', Validators.required],
      'age': ['', Validators.required],
      'dob': [''],
      'gender': ['', Validators.required],
      'phone': ['', Validators.required],
      'blood_group': ['', Validators.required],
      // 'wedding_date': [''],
      // 'guardian_name': [''],
      // 'native_place': [''],
      // 'education': [''],
      // 'pincode': [''],
      'business': this.fb.group({
        'name': [''],
        'type': [''],
      }),
      'address':  this.fb.group({
        'fullAddress': [''],
        'state': [''],
        'city': [''],
      }),
    })
  }

  get firstname() {
    return this.formData.get('firstName')
  }
  get lastname() {
    return this.formData.get('lastName')
  }
  get email() {
    return this.formData.get('email')
  }
  get gender() {
    return this.formData.get('gender')
  }
  get phone() {
    return this.formData.get('phone')
  }
  get blood_group() {
    return this.formData.get('blood_group')
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
