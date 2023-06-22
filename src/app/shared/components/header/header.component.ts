import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  communities: any;
  selectedCommunity: any;

  constructor() { }

  ngOnInit(): void {
    this.communities = [
      { name: 'Shah', id: 123 },
      { name: 'Jain', id: 124 },
      { name: 'Bhansali', id: 125 },
      { name: 'Jaswa', id: 126 },
      { name: 'Sandesara', id: 127 }
    ];
  }

  onChangeCommunity() {

  }

}
