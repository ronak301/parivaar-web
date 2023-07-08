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

  updateCommunity(data: any) {
    return this.http.post(this.apiUrl + 'community/create', data).toPromise()
  }

  getCommunityMembers(communityId: string) {
    return this.http.get(this.apiUrl + 'community/members/' + communityId).toPromise()
  }

  async addMember(data: any, communityId: any) {
    const res: any = await this.http.post(this.apiUrl + 'user/new', data).toPromise()
    console.log(res)
    const userId = res.user.id
    let joinData = {
      userId: userId
    }
    const res2 = await this.joinCommunity(joinData, communityId)
    console.log('res2',res2)
    return res2
  }

  updateUser(userId:string,data:any) {
    return this.http.put(this.apiUrl + `user/${userId}`, data).toPromise()
  }

  getUserById(id: string) {
    return this.http.get(this.apiUrl + 'user/' + id).toPromise()
  }

  async joinCommunity(data: any, communityId: any) {
    return await this.http.post(this.apiUrl + `community/join/${communityId}`, data).toPromise()
  }

}
