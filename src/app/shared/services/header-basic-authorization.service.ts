import { Injectable } from '@angular/core';
import { HttpHeaders } from '@angular/common/http';
import { StorageService } from './storage.service';
import { StorageKeyEnum } from '../enums/storage-key.enum';

@Injectable({
  providedIn: 'root'
})
export class HeaderBasicAuthorizationService {
  constructor(private storageService:StorageService) {}

  getHeaders(): HttpHeaders {
    const token = this.storageService.get(StorageKeyEnum.JWT_AUTHORIZATION)
    let headers = new HttpHeaders({
      'Authorization': 'Bearer ' + token
    });
    return headers;
  }

}
