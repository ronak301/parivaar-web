import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-listing',
  templateUrl: './listing.component.html',
  styleUrls: ['./listing.component.scss']
})
export class ListingComponent implements OnInit {

  data: any = [];
  addEditModalDisplay:boolean = false;

  constructor() { }

  ngOnInit(): void {
    this.data = [
      { name: 'Chetan Kudnekar', link: 'Https://Google.com', active_members: '24', status: 'Active' },
      { name: 'Chetan Jain', link: 'Https://Google.com', active_members: '24', status: 'Pending' },
      { name: 'Chetan Banshali', link: 'Https://Google.com', active_members: '24', status: 'Active' },
      { name: 'Chetan Jaswa', link: 'Https://Google.com', active_members: '24', status: 'Pending' },
    ]
  }

  openAddEditCommunityModal() {
    this.addEditModalDisplay = true
  }

}
