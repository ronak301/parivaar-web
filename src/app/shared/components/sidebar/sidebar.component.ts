import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/services/auth.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(
    public router: Router,
    public auth: AuthService
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
      this.onRoute('/auth')
    }).catch(err => {
      console.log(err)
    });
  }

}
