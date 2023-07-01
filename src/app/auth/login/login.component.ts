import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {

  phoneNumber: string = '';
  otp: string = '';
  isOtpSent: boolean = false;

  constructor(public auth: AuthService, public router: Router) { }

  ngOnInit(): void {
  }

  onSignin() {
    const numberString = '+91' + this.phoneNumber.replace(/[^0-9]/g, '');
    this.auth.onSignIn(numberString).then(res => {
      console.log('signin res', res)
      this.isOtpSent = true
    }).catch(err => {
      console.log(err)
    })
  }

  onOtpVerify() {
    const numberString = '+91' + this.phoneNumber.replace(/[^0-9]/g, '');
    const otp = this.otp.replace(/[^0-9]/g, '');
    this.auth.onOtpVerify(numberString, otp).then(res => {
      console.log('verify otp res', res)
      this.auth.setUserAuthStateinLocal(res)
      this.router.navigateByUrl('/pages/manage-communities')
    }).catch(err => {
      console.log(err)
    })
  }

  resendOtp() {
    this.onSignin()
  }

}
