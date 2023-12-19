import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { AuthService } from './auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class HeaderBasicAuthorizationService {
  token:string = null;
  constructor(
    private authService:AuthService,
  ) {
    this.token = this.authService.getToken();
  }

  get() : HttpHeaders{
    let headers = new HttpHeaders({
        'Authorization': 'Bearer '+this.token
    });
    return headers;
  }


}
