import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-edit-member',
  templateUrl: './add-edit-member.component.html',
  styleUrls: ['./add-edit-member.component.scss']
})
export class AddEditMemberComponent implements OnInit {

  @Input() id:string = '';
  
  imagePreviewUrl:string = './assets/images/user.png';
  bloodGroup:any = [];
  gender:any = ['Male','Female'];

  constructor() { }

  ngOnInit(): void {
  }

}
