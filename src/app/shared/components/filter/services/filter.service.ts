import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class FilterService {

  apiUrl: string = environment.apiUrl;

  constructor(
    public http: HttpClient
  ) { }

  getMemberBySearch(data: any, isAccountManager: any) {
    let tempData = {
      "query": data,
      "filter": { isAccountManager: isAccountManager || undefined},
      "limit": 40,
      "skip": 0
    }
    return this.http.post(this.apiUrl + 'user/search', tempData).toPromise()
  }
  // getMemberBySearch(data: any) {
  //   let tempData = {
  //     "query": "",
  //     "filter": data,
  //     "limit": 10,
  //     "skip": 0
  //   }
  //   return this.http.post(this.apiUrl + 'user/search', tempData).toPromise()
  // }
}
