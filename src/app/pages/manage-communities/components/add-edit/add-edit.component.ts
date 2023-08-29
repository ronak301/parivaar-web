import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { CommunityStatus, CommunityTypes } from 'src/app/shared/constants/constants';
import { CommonService } from 'src/app/shared/services/common.service';
import { ManageCommunitiesService } from '../../services/manage-communities.service';
import { AuthService } from 'src/app/auth/services/auth.service';
import { FirebaseService } from 'src/app/shared/services/firebase.service';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {

  @Input() id: string = '';
  @Input() data: any;
  @Output() onSuccess = new EventEmitter<string>();

  imagePreviewUrl: string = './assets/images/user.jpeg';
  types: any;
  subTypes: any = [];
  statusOptions: any;
  formData!: FormGroup
  imageFile: any = null;
  isSuperAdmin: boolean = false;

  constructor(
    public fb: FormBuilder,
    public commonService: CommonService,
    private communitiesService: ManageCommunitiesService,
    private authService: AuthService,
    public firebaseService: FirebaseService
  ) { }

  ngOnInit(): void {
    this.initializeConfigData()
    this.initializeForms()
    this.isSuperAdmin = this.authService.isSuperAdmin();
    console.log('data', this.data)
    if (this.data?.logo) {
      this.imagePreviewUrl = this.data?.logo
    }
    if (this.id) {
      this.patchValue()
    }
  }

  initializeConfigData() {
    this.types = this.firebaseService.configData.CommunityTypes;
    this.statusOptions = this.firebaseService.configData.CommunityStatus;
  }

  initializeForms() {
    this.formData = this.fb.group({
      'name': ['', Validators.required],
      'logo': [null],
      'description': [''],
      'type': ['', Validators.required],
      'subType': ['', Validators.required],
      'status': ['Pending', Validators.required],
    })
  }

  patchValue() {
    console.log(this.data)
    this.formData.patchValue(this.data)
    this.onSelectType()
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

  onSelectType() {
    let data = this.types.find((el: any) => el.id == this.type?.value)
    this.subTypes = data.subTypes
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
      this.commonService.showToast("error", "Error", "Size should be less then 1mb!")
    }
  }

  async onSubmit() {
    console.log(this.formData.value)
    this.commonService.startLoader()
    if (this.id) {
      try {
        const res: any = await this.communitiesService.updateCommunity(this.id, this.formData.value, this.imageFile, this.data?.imagePath)
        this.commonService.stopLoader()
        this.onSuccess.emit()
        this.formData.reset()
        this.commonService.showToast('success', "Updated", res?.message)
      } catch (err: any) {
        this.commonService.showToast('error', "Error", err?.error?.message)
        this.commonService.stopLoader()
      }
    } else {
      try {
        let data = { status: 'Pending', ...this.formData.value }
        await this.communitiesService.createCommunity(data, this.imageFile)
        this.commonService.stopLoader()
        this.onSuccess.emit()
        this.formData.reset()
        this.commonService.showToast('success', "Created", "Created Successful!")
      } catch (err: any) {
        this.commonService.showToast('error', "Error", err?.error?.message)
        this.commonService.stopLoader()
      }
    }
  }

  getCover() {
    return "url('" + this.imagePreviewUrl + "')"
  }

}
