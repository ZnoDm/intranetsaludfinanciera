import { Injectable, OnDestroy, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { exhaustMap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HeaderBasicAuthorizationService } from './header-basic-authorization.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  constructor(
      private httpClient: HttpClient,
      private headerBasicAuthorization: HeaderBasicAuthorizationService,
    ) {
  }

  findAll(): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}`,
      { headers: this.headerBasicAuthorization.getHeaders()}
    ).pipe( map( data => data ));;
  }

  findOneById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${environment.apiUrl}/${id}`,
    { headers: this.headerBasicAuthorization.getHeaders()}
  ).pipe( map( data => data ));;
  }

  create(createPermisoDto: Partial<any>): Observable<any> {
    return this.httpClient.post<any>(`${environment.apiUrl}`, 
    createPermisoDto,
    { headers: this.headerBasicAuthorization.getHeaders()}
  ).pipe( map( data => data ));;
  }

  update(id: number, updatePermisoDto: Partial<any>): Observable<any> {
    return this.httpClient.patch<any>(`${environment.apiUrl}/${id}`, 
    updatePermisoDto,
    { headers: this.headerBasicAuthorization.getHeaders()}
  ).pipe( map( data => data ));;
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${environment.apiUrl}/${id}`,
    { headers: this.headerBasicAuthorization.getHeaders()}
    ).pipe( map( data => data ));;
  }

     
}