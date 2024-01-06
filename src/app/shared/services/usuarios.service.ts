import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HeaderBasicAuthorizationService } from './header-basic-authorization.service';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
  private apiUrl = environment.apiUrl + '/users';
  isLoadingSubject: BehaviorSubject<boolean>;
  isLoading$: Observable<boolean>;

  constructor(
    private httpClient: HttpClient,
    private headerBasicAuthorization: HeaderBasicAuthorizationService
  ) { 
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  toggleRoleForUser(id: number, rolId: number, isActive: boolean): Observable<any> {
    this.isLoadingSubject.next(true);
    const body = { isActive };
    return this.httpClient.put<any>(`${this.apiUrl}/${id}/permisos/${rolId}`, body,
      { headers: this.headerBasicAuthorization.getHeaders()}
    ).pipe(
      map(data => data),
      catchError((err) => {
        return of(err);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }
  getAllRolesForUserWithFlag(id:number) {
    this.isLoadingSubject.next(true);
    return this.httpClient.get<any>(`${this.apiUrl}/${id}/permisos`,
      { headers: this.headerBasicAuthorization.getHeaders()}
    ).pipe( 
      map( data => data ),
      catchError((err) => {
        return of(err);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  getUsers(): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.httpClient.get<any[]>(`${this.apiUrl}`, { headers: this.headerBasicAuthorization.getHeaders() })
    .pipe(
        catchError((err) => {
          return of(err);
        }),
        finalize(() => this.isLoadingSubject.next(false))
    );
  }

  findOneById(id: number): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.httpClient.get<any>(`${this.apiUrl}/${id}`, { headers: this.headerBasicAuthorization.getHeaders() })
    .pipe(
        map( data => data ),
        catchError((err) => {
          return of(err);
        }),
        finalize(() => this.isLoadingSubject.next(false))
    );
  }

  enableDisableUser(id: number): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.httpClient.put<any>(`${this.apiUrl}/${id}/enabled-disabled`, {}, { headers: this.headerBasicAuthorization.getHeaders() })
    .pipe(
        map( data => data ),
        catchError((err) => {
          return of(err);
        }),
        finalize(() => this.isLoadingSubject.next(false))
    );
  }

  
  resetPassword(id: number): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.httpClient.put<any>(`${this.apiUrl}/${id}/reset-password`, 
    { headers: this.headerBasicAuthorization.getHeaders() })
    .pipe(
        map( data => data ),
        catchError((err) => {
            return of(err);
        }),
        finalize(() => this.isLoadingSubject.next(false))
    );
  }

  





  createUser(user: any): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.httpClient.post<any>(`${this.apiUrl}`, user, { headers: this.headerBasicAuthorization.getHeaders() })
    .pipe(
        map( data => data ),
        catchError((err) => {
          return of(err);
        }),
        finalize(() => this.isLoadingSubject.next(false))
    );
  }

  updateUser(id: number, updatedUser: any): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.httpClient.patch<any>(`${this.apiUrl}/${id}`, updatedUser, { headers: this.headerBasicAuthorization.getHeaders() })
    .pipe(
        map( data => data ),
        catchError((err) => {
            return of(err);
        }),
        finalize(() => this.isLoadingSubject.next(false))
    );
  }

  
  // You can implement delete method similarly
}
