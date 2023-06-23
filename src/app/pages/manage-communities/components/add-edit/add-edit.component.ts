import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {

  @Input() id:string = '';
  
  imagePreviewUrl:string = './assets/images/user.png';

  constructor() { }

  ngOnInit(): void {
  }

}
