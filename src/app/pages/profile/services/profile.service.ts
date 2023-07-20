import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  apiUrl: string = environment.apiUrl;

  constructor(
    public http: HttpClient
  ) { }

  getUserById(id: string) {
    return this.http.get(this.apiUrl + 'user/' + id).toPromise()
  }

  updateMember(userId: string, data: any) {
    return this.http.put(this.apiUrl + `user/${userId}`, data).toPromise()
  }

  updateBusiness(id: string, data: any) {
    return this.http.put(this.apiUrl + `business/${id}`, data).toPromise()
  }

  addRelative(data: any) {
    return this.http.post(this.apiUrl + 'relationship/relative/new', data).toPromise()
  }

  joinCommunity(data: any, communityId: any) {
    return this.http.post(this.apiUrl + `community/join/${communityId}`, data).toPromise()
  }

  createBusiness(data: any) {
    return this.http.post(this.apiUrl + `business/new`, data).toPromise()
  }

  updateAddress(id: string, data: any) {
    return this.http.put(this.apiUrl + `address/${id}`, data).toPromise()
  }
}
