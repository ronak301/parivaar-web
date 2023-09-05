import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  communities: any;
  selectedCommunity: any;
  user:any;

  constructor(
    public auth: AuthService,
    public commonService:CommonService
  ) { }

  ngOnInit(): void {
    this.communities = [
      { name: 'Shah', id: 123 },
      { name: 'Jain', id: 124 },
      { name: 'Bhansali', id: 125 },
      { name: 'Jaswa', id: 126 },
      { name: 'Sandesara', id: 127 }
    ];
    this.user = this.auth.getUserLocalData()
  }

  onChangeCommunity() {

  }

}
