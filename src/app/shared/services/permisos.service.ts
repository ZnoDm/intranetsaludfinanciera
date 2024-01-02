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
export class PermisosService {
  apiUrl = environment.apiUrl + '/permisos';
  constructor(
      private httpClient: HttpClient,
      private headerBasicAuthorization: HeaderBasicAuthorizationService,
    ) {
  }

 
  findAll(): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}`,
      { headers: this.headerBasicAuthorization.getHeaders()}
    ).pipe( map( data => data ));;
  }

  findOneById(id: number): Observable<any> {
    return this.httpClient.get<any>(`${this.apiUrl}//${id}`,
    { headers: this.headerBasicAuthorization.getHeaders()}
  ).pipe( map( data => data ));;
  }

  create(createPermisoDto: Partial<any>): Observable<any> {
    return this.httpClient.post<any>(`${this.apiUrl}/`, 
    createPermisoDto,
    { headers: this.headerBasicAuthorization.getHeaders()}
  ).pipe( map( data => data ));;
  }

  update(id: number, updatePermisoDto: Partial<any>): Observable<any> {
    return this.httpClient.patch<any>(`${this.apiUrl}//${id}`, 
    updatePermisoDto,
    { headers: this.headerBasicAuthorization.getHeaders()}
  ).pipe( map( data => data ));;
  }

  delete(id: number): Observable<void> {
    return this.httpClient.delete<void>(`${this.apiUrl}//${id}`,
    { headers: this.headerBasicAuthorization.getHeaders()}
    ).pipe( map( data => data ));;
  }

     
}