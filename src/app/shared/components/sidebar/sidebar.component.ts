import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';
import { CommonService } from '../../services/common.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {


  constructor(
    public router: Router,
    public auth: AuthService,
    public commonService: CommonService
  ) { }

  ngOnInit(): void {
  }

  onRoute(url: string) {
    this.router.navigateByUrl(url);
  }

  onLogout() {
    this.auth.logout().then(res => {
      console.log('logout res', res)
      this.auth.removeUserAuthStateLocal()
      this.auth.removeUserLocal()
      this.auth.removeIsSuperAdmin()
      this.onRoute('/auth')
    }).catch(err => {
      this.commonService.showToast('error', "Error", err?.error?.message)
    });
  }

}
