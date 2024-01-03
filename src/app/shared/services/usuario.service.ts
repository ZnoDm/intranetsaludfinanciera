import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';
import { HeaderBasicAuthorizationService } from './header-basic-authorization.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {
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


  findAll(): Observable<any[]> {
    return this.httpClient.get<any[]>(`${this.apiUrl}`, { headers: this.headerBasicAuthorization.getHeaders() })
    .pipe(
        map( data => data ),
        catchError((err) => {
          return of(err);
        }),
        finalize(() => this.isLoadingSubject.next(false))
    );
  }

  findOneById(id: number): Observable<any> {
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
    return this.httpClient.put<any>(`${this.apiUrl}/${id}/enabled-disabled`, {}, { headers: this.headerBasicAuthorization.getHeaders() })
    .pipe(
        map( data => data ),
        catchError((err) => {
          return of(err);
        }),
        finalize(() => this.isLoadingSubject.next(false))
    );
  }

  createUser(user: any): Observable<any> {
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
