import { Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root'
})
export class CommonService {

  loader: boolean = false

  constructor(
    private messageService: MessageService
  ) { }

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
}
