import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManageCommunitiesService {

  apiUrl: string = environment.apiUrl;

  constructor(
    public http: HttpClient
  ) { }

  getAllCommunities() {
    return this.http.get(this.apiUrl + 'community/all').toPromise()
  }

  getCommunityById(id: string) {
    return this.http.get(this.apiUrl + 'community/' + id).toPromise()
  }

  createCommunity(data: any) {
    return this.http.post(this.apiUrl + 'community/create', data).toPromise()
  }

  updateCommunity(id: any, data: any) {
    return this.http.put(this.apiUrl + `community/${id}`, data).toPromise()
  }

  getCommunityMembers(communityId: string) {
    let data = {
      filter: {},
      query: '',
      skip: 0,
      limit: 1000
    }
    return this.http.post(this.apiUrl + 'community/members/' + communityId, data).toPromise();
  }

  addMember(data: any) {
    return this.http.post(this.apiUrl + 'user/new', data).toPromise()
  }

  addRelative(data: any) {
    return this.http.post(this.apiUrl + 'relationship/relative/new', data).toPromise()
  }

  updateMember(userId: string, data: any) {
    return this.http.put(this.apiUrl + `user/${userId}`, data).toPromise()
  }

  updateAddress(id: string, data: any) {
    return this.http.put(this.apiUrl + `address/${id}`, data).toPromise()
  }

  createBusiness(data: any) {
    return this.http.post(this.apiUrl + `business/new`, data).toPromise()
  }

  updateBusiness(id: string, data: any) {
    return this.http.put(this.apiUrl + `business/${id}`, data).toPromise()
  }

  getUserById(id: string) {
    return this.http.get(this.apiUrl + 'user/' + id).toPromise()
  }

  joinCommunity(data: any, communityId: any) {
    return this.http.post(this.apiUrl + `community/join/${communityId}`, data).toPromise()
  }
  
  createExecutive(data:any) {
    return this.http.post(this.apiUrl + `executive/create`, data).toPromise()
  }

  addRole(data:any) {
    return this.http.post(this.apiUrl + `executive/role/add`, data).toPromise()
  }

  updateExecutive(id:string,data:any) {
    return this.http.put(this.apiUrl + `executive/${id}`, data).toPromise()
  }

}
