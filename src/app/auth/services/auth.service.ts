import { Injectable } from '@angular/core';
import {
  AuthChangeEvent,
  AuthSession,
  createClient,
  Session,
  SupabaseClient,
  User,
} from '@supabase/supabase-js'
import { environment } from 'src/environments/environment'

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supabase: SupabaseClient
  _session: AuthSession | null = null
  userAuthStateKey: string = 'userAuthState';

  constructor() {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey)
  }

  get session() {
    this.supabase.auth.getSession().then(({ data }) => {
      this._session = data.session
    })
    return this._session
  }

  authChanges(callback: (event: AuthChangeEvent, session: Session | null) => void) {
    return this.supabase.auth.onAuthStateChange(callback)
  }

  onSignIn(phoneNumber: string) {
    return this.supabase.auth.signInWithOtp({ phone: phoneNumber })
  }

  onOtpVerify(phoneNumber: string, otp: string = '123456') {
    return this.supabase.auth.verifyOtp({
      phone: phoneNumber,
      token: otp,
      type: 'sms',
    })
  }

  resendOtp(phoneNumber: string) {
    return this.supabase.auth.resend({
      type: 'sms',
      phone: phoneNumber
    })
  }

  logout() {
    return this.supabase.auth.signOut()
  }

  setUserAuthStateinLocal(userData: any) {
    let stringValue = JSON.stringify(userData)
    localStorage.setItem(this.userAuthStateKey, stringValue)
  }

  getUserAuthStateLocalData() {
    localStorage.getItem(this.userAuthStateKey)
  }

  removeUserAuthStateLocal() {
    localStorage.removeItem(this.userAuthStateKey)
  }

}
