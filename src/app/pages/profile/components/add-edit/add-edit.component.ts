import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss']
})
export class AddEditComponent implements OnInit {

  imagePreviewUrl:string = './assets/images/user.jpeg';

  constructor() { }

  ngOnInit(): void {
  }

}
