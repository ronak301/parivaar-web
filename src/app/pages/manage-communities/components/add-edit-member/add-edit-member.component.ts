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
      'first_name': ['', Validators.required],
      'last_name': ['', Validators.required],
      'dob': [''],
      'gender': ['', Validators.required],
      'phone': ['', Validators.required],
      'email': ['', Validators.required],
      'blood_group': ['', Validators.required],
      'wedding_date': ['', Validators.required],
      'guardian_name': [''],
      'native_place': [''],
      'education': [''],
      
      // these fields are not in db
      'full_address': [''],
      'pincode': [''],
      'city': [''],
      'state': [''],

    })
  }

  get first_name() {
    return this.formData.get('first_name')
  }
  get last_name() {
    return this.formData.get('last_name')
  }
  get gender() {
    return this.formData.get('gender')
  }
  get phone() {
    return this.formData.get('phone')
  }
  get email() {
    return this.formData.get('email')
  }
  get blood_group() {
    return this.formData.get('blood_group')
  }

  onSubmit() {
    console.log(this.formData.value)
    if (this.id) {

    } else {

    }
  }

}
