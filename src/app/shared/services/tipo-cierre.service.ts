import { Injectable, OnDestroy, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { exhaustMap, map, catchError, finalize } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HeaderBasicAuthorizationService } from './header-basic-authorization.service';
import { BehaviorSubject, Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TipoCierreService {

  isLoadingSubject: BehaviorSubject<boolean>;
  isLoading$: Observable<boolean>;

  apiUrl = environment.apiUrl + '/tipo-cierre';
  constructor(
      private httpClient: HttpClient,
      private headerBasicAuthorization: HeaderBasicAuthorizationService,
    ) {
      this.isLoadingSubject = new BehaviorSubject<boolean>(false);
      this.isLoading$ = this.isLoadingSubject.asObservable();
  }

 
 
  findAll(): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.httpClient.get<any>(`${this.apiUrl}`,
      { headers: this.headerBasicAuthorization.getHeaders()}
    ).pipe( 
      map( data => data ),
      catchError((err) => {
        return of(err);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  findOneById(id: number): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.httpClient.get<any>(`${this.apiUrl}//${id}`,
    { headers: this.headerBasicAuthorization.getHeaders()}
    ).pipe( 
      map( data => data ),
      catchError((err) => {
        return of(err);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  create(createTipoCierreDto: Partial<any>): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.httpClient.post<any>(`${this.apiUrl}/`, 
    createTipoCierreDto,
    { headers: this.headerBasicAuthorization.getHeaders()}
    ).pipe( 
      map( data => data ),
      catchError((err) => {
        return of(err);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  update(id: number, updateTipoCierreDto: Partial<any>): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.httpClient.patch<any>(`${this.apiUrl}/${id}`, 
    updateTipoCierreDto,
    { headers: this.headerBasicAuthorization.getHeaders()}
    ).pipe( 
      map( data => data ),
      catchError((err) => {
        return of(err);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  delete(id: number): Observable<void> {
    this.isLoadingSubject.next(true);
    return this.httpClient.delete<void>(`${this.apiUrl}/${id}`,
    { headers: this.headerBasicAuthorization.getHeaders()}
    ).pipe( 
      map( data => data ),
      catchError((err) => {
        return of(err);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

     
}