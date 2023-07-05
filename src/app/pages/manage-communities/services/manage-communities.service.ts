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



}
