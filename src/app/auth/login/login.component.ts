import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';
import { CommonService } from 'src/app/shared/services/common.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  phoneNumber: string = '';
  otp: string = '';
  isOtpSent: boolean = false;

  constructor(
    public auth: AuthService,
    public router: Router,
    public commonService: CommonService,
  ) { }

  ngOnInit(): void {
  }

  onSignin() {
    const numberString = '+91' + this.phoneNumber.replace(/[^0-9]/g, '');
    this.commonService.startLoader()
    this.auth.onSignIn(numberString).then(res => {
      console.log('signin res', res)
      this.isOtpSent = true
      this.commonService.stopLoader()
    }).catch(err => {
      console.log(err)
      this.commonService.stopLoader()
    })
  }

  onOtpVerify() {
    const numberString = '+91' + this.phoneNumber.replace(/[^0-9]/g, '');
    const otp = this.otp.replace(/[^0-9]/g, '');
    this.commonService.startLoader()
    this.auth.onOtpVerify(numberString, otp).then(res => {
      console.log('verify otp res', res)
      this.auth.getUserByPhoneNumber(this.phoneNumber.replace(/[^0-9]/g, '')).then((userRes: any) => {
        this.commonService.stopLoader()
        if (userRes?.data?.count > 0) {
          this.auth.setUserAuthStateinLocal(res)
          this.auth.setUserinLocal(userRes.data.rows[0])
          this.router.navigateByUrl('/pages/manage-communities')
        } else {
          this.commonService.showToast('error','Error','User Not Created! Please connect admin!')
        }
      }).catch(err => {
        this.commonService.showToast('error','Error',err)
        this.commonService.stopLoader()
        console.log(err)
      })
    }).catch(err => {
      this.commonService.stopLoader()
      this.commonService.showToast('error','Error',err)
      console.log(err)
    })
  }

  resendOtp() {
    this.onSignin()
  }

}
