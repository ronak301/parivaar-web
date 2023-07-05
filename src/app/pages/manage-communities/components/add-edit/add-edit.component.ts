import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CommunitySubTypes, CommunityTypes } from 'src/app/shared/constants/constants';
import { CommonService } from 'src/app/shared/services/common.service';
import { ManageCommunitiesService } from '../../services/manage-communities.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {

  @Input() id: string = '';
  @Input() data: any;
  @Output() onSuccess = new EventEmitter<string>();

  imagePreviewUrl: string = './assets/images/user.png';
  types: any = CommunityTypes;
  subTypes: any = CommunitySubTypes;
  formData!: FormGroup

  constructor(
    public fb: FormBuilder,
    public commonService: CommonService,
    private communitiesService: ManageCommunitiesService,
  ) { }

  ngOnInit(): void {
    this.initializeForms()
    if (this.id) {
      this.patchValue()
    }
  }

  initializeForms() {
    this.formData = this.fb.group({
      'name': ['', Validators.required],
      'logo': [null],
      'description': [''],
      'type': ['', Validators.required],
      'subType': ['', Validators.required],
    })
  }

  patchValue() {
    console.log(this.data)
    this.formData.patchValue(this.data)
  }

  get name() {
    return this.formData.get('name')
  }
  get description() {
    return this.formData.get('description')
  }
  get type() {
    return this.formData.get('type')
  }
  get subType() {
    return this.formData.get('subType')
  }

  onSubmit() {
    console.log(this.formData.value)
    this.commonService.startLoader()
    if (this.id) {
      //update
      this.commonService.stopLoader()
      this.onSuccess.emit()
    } else {
      let data = { status: 'Pending', ...this.formData.value }
      this.communitiesService.createCommunity(data).then(res => {
        console.log(res)
        this.commonService.stopLoader()
        this.onSuccess.emit()
        this.commonService.showToast('success', "Created", "Created Successful!")
      }).catch(err => {
        this.commonService.showToast('error', "Error", err)
        this.commonService.stopLoader()
      })
    }
  }

}
