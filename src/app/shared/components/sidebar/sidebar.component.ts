import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  constructor(
    public router: Router
  ) { }

  ngOnInit(): void {
  }

  onRoute(url: string) {
    this.router.navigateByUrl(url);
    if(url == '/auth') {
      setTimeout(() => {
        location.reload();
      }, 100);
    }
  }

}