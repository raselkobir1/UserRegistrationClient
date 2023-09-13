import { Injectable } from '@angular/core';
import { User } from '../../interfaces/user.model'
import { HttpClient, HttpHeaders } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class UserRepositoryService {

  constructor(private http: HttpClient) { }
  urlAddress: string = 'http://localhost:5062/api/user/user';
  public createUser = (route: string, user: User) => {
    return this.http.post<any>(this.urlAddress, user, this.generateHeaders());
  }

  // private createCompleteRoute = (route: string, url: string) => {
  //   return `${this.urlAddress}/${route}`;
  // }
  private generateHeaders = () => {
    return {
      headers: new HttpHeaders({ 'Content-Type': 'application/json' })
    }
  }
}
