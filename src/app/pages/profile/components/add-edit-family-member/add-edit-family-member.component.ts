import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-edit-family-member',
  templateUrl: './add-edit-family-member.component.html',
  styleUrls: ['./add-edit-family-member.component.scss']
})
export class AddEditFamilyMemberComponent implements OnInit {

  @Input() id:string = '';
  
  imagePreviewUrl:string = './assets/images/user.jpeg';
  bloodGroup:any = [];
  gender:any = ['Male','Female'];

  constructor() { }

  ngOnInit(): void {
  }

}
