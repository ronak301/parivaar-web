import { Component } from '@angular/core';
import { CommonService } from './shared/services/common.service';
import { FirebaseService } from './shared/services/firebase.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {

  title: string = 'Community App';

  constructor(
    public commonService: CommonService,
    public firebaseService: FirebaseService,
  ) { }

  submit() {
    let data = {
      
    }
    this.firebaseService.updateConfigData(data).then(res=>{
      console.log('Udpated successfully!')
      console.log(res)
    }).catch(err=>{
      console.log(err)
    })
  }

}
