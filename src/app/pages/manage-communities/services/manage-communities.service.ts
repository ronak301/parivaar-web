import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { StorageService } from 'src/app/shared/services/storage.service';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ManageCommunitiesService {

  apiUrl: string = environment.apiUrl;

  constructor(
    public http: HttpClient,
    public storage: StorageService
  ) { }

  getAllCommunities() {
    return this.http.get(this.apiUrl + 'community/all').toPromise()
  }

  getCommunityById(id: string) {
    return this.http.get(this.apiUrl + 'community/' + id).toPromise()
  }

  async createCommunity(data: any, file?: any) {
    if (file) {
      let path = "/community/" + new Date()
      const url = await this.storage.upload(path, file)
      data.logo = url
      data.imagePath = path
    }
    return this.http.post(this.apiUrl + 'community/create', data).toPromise()
  }

  async updateCommunity(id: any, data: any, file?: any, filePath?: any) {
    let path = "";
    if (filePath) {
      path = filePath
    }
    if (file) {
      if (!path) {
        path = "/community/" + new Date()
      }
      const url = await this.storage.upload(path, file)
      data.logo = url
      data.imagePath = path
    }
    return this.http.put(this.apiUrl + `community/${id}`, data).toPromise()
  }

  getCommunityMembers(communityId: string, from: number, to: number, isAccountManager: boolean) {
    let data = {
      filter: {
        isAccountManager: isAccountManager
      },
      query: '',
      skip: from,
      limit: to
    }
    return this.http.post(this.apiUrl + 'community/members/' + communityId, data).toPromise();
  }

  async addMember(data: any, file?: any) {
    if (file) {
      let path = "/user/" + new Date()
      const url = await this.storage.upload(path, file)
      data.profilePicture = url
      data.imagePath = path
    }
    return this.http.post(this.apiUrl + 'user/new', data).toPromise()
  }

  async updateMember(userId: string, data: any, file?: any, filePath?: any) {
    let path = "";
    if (filePath) {
      path = filePath
    }
    if (file) {
      if (!path) {
        path = "/user/" + new Date()
      }
      const url = await this.storage.upload(path, file)
      data.profilePicture = url
      data.imagePath = path
    }
    return this.http.put(this.apiUrl + `user/${userId}`, data).toPromise()
  }

  addRelative(data: any) {
    return this.http.post(this.apiUrl + 'relationship/relative/new', data).toPromise()
  }

  createRelation(data: any) {
    return this.http.post(this.apiUrl + 'relationship/relation/new', data).toPromise()
  }

  deleteRelation(id: any) {
    return this.http.delete(this.apiUrl + 'relationship/delete/' + id).toPromise()
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

  createExecutive(data: any) {
    return this.http.post(this.apiUrl + `executive/create`, data).toPromise()
  }

  addRole(data: any) {
    return this.http.post(this.apiUrl + `executive/role/add`, data).toPromise()
  }

  updateExecutive(id: string, data: any) {
    return this.http.put(this.apiUrl + `executive/${id}`, data).toPromise()
  }

  deleteMember(id: string) {
    return this.http.delete(this.apiUrl + `user/delete/${id}`).toPromise()
  }

  getMemberBySearch(data: any) {
    let tempData = {
      "query": data,
      "filter": {},
      "limit": 1,
      "skip": 0
    }
    return this.http.post(this.apiUrl + 'user/search', tempData).toPromise()
  }

  searchExecutiveMembers(data: any, communityId: any) {
    let tempData = {
      "query": data,
      "filter": { isAccountManager: true },
      "limit": 40,
      "skip": 0
    }
    return this.http.post(this.apiUrl + 'user/search', tempData).toPromise()
  }
}
