import { Injectable, HostListener } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  loader: boolean = false
  showSidebar: boolean = false;
  isMobile: boolean = false;

  @HostListener('window:resize', ['$event'])
  onResize(event: Event): void {
    this.checkScreenSize();
  }

  constructor(
    private messageService: MessageService,
  ) {
    this.checkScreenSize()
  }

  startLoader() {
    this.loader = true
  }

  stopLoader() {
    this.loader = false
  }


  showToast(type: string, title: string, message: string) {
    if (type == 'success') {
      this.messageService.add({ severity: 'success', summary: title, detail: message });
    } else if (type == 'warn') {
      this.messageService.add({ severity: 'warn', summary: title, detail: message });
    } else if (type == 'error') {
      this.messageService.add({ severity: 'error', summary: title, detail: message });
    }
  }

  toggleSidebar() {
    if(this.isMobile) {
      this.showSidebar = !this.showSidebar;
    }
  }

  private checkScreenSize(): void {
    this.isMobile = window.innerWidth < 768;
    if(!this.isMobile) {
      this.showSidebar = true
    }
  }
}
