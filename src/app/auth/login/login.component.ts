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
  isSuperAdmin: boolean = false;
  userData: any;

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
    this.auth.getUserByPhoneNumber(this.phoneNumber.replace(/[^0-9]/g, '')).then((userRes: any) => {
      if (userRes?.data?.count > 0) {
        this.userData = userRes.data.rows[0]
        this.auth.onSignIn(numberString).then(res => {
          console.log('signin res', res)
          this.isOtpSent = true
          this.commonService.showToast('success', "OTP Sent", "OTP Sent Successfully!")
          this.commonService.stopLoader()
        }).catch(err => {
          console.log(err)
          this.commonService.showToast('error', "Error", err?.error?.message)
          this.commonService.stopLoader()
        })
      } else {
        this.commonService.showToast('error', 'Error', 'User Not Created! Please connect admin!')
        this.commonService.stopLoader()
      }
    }).catch(err => {
      this.commonService.showToast('error', "Error", err?.error?.message)
      this.commonService.stopLoader()
      console.log(err)
    })
  }

  onOtpVerify() {
    const numberString = '+91' + this.phoneNumber.replace(/[^0-9]/g, '');
    const otp = this.otp.replace(/[^0-9]/g, '');
    this.commonService.startLoader()
    this.auth.onOtpVerify(numberString, otp).then(otpVerifyRes => {
      console.log('verify otp res', otpVerifyRes)
      if (this.isSuperAdmin) {
        this.auth.checkIsSuperAdmin({ phone: this.phoneNumber.replace(/[^0-9]/g, '') }).subscribe((superAdminRes: any) => {
          console.log('superAdminRes', superAdminRes)
          if (superAdminRes?.permission) {
            this.auth.setIsSuperAdmin(superAdminRes?.permission)
            this.auth.setUserAuthStateinLocal(otpVerifyRes)
            this.auth.setUserinLocal(this.userData)
            this.router.navigateByUrl('/pages/manage-communities')
            this.commonService.stopLoader();
          } else {
            this.commonService.showToast("error", "Error", "Invalid credentails!")
            this.commonService.stopLoader();
          }
        }, err => {
          this.commonService.showToast('error', "Error", err?.error?.message)
          this.commonService.stopLoader();
        })
      } else {
        this.auth.checkIsAdmin({ phone: this.phoneNumber.replace(/[^0-9]/g, '') }).subscribe((adminRes: any) => {
          console.log('adminRes', adminRes)
          if (adminRes?.permission) {
            this.auth.setIsSuperAdmin(false)
            this.auth.setUserAuthStateinLocal(otpVerifyRes)
            this.auth.setUserinLocal(this.userData)
            this.router.navigateByUrl('/pages/manage-communities')
            this.commonService.stopLoader();
          } else {
            this.commonService.showToast("error", "Error", "Invalid credentails!")
            this.commonService.stopLoader();
          }
        }, err => {
          this.commonService.showToast('error', "Error", err?.error?.message)
          this.commonService.stopLoader();
        })
      }
    }).catch(err => {
      this.commonService.showToast('error', "Error", err?.error?.message)
      this.commonService.stopLoader()
      console.log(err)
    })
  }

  resendOtp() {
    this.onSignin()
  }

  back() {
    this.isOtpSent = false;
    this.otp = "";
  }

}
