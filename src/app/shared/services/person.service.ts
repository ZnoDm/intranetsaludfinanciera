import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HeaderBasicAuthorizationService } from './header-basic-authorization.service';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { catchError, finalize, map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  isLoadingSubject: BehaviorSubject<boolean>;
  isLoading$: Observable<boolean>;
  apiUrl = environment.apiUrl + '/person'; // Reemplaza con tu endpoint correspondiente

  constructor(
    private httpClient: HttpClient,
    private headerBasicAuthorization: HeaderBasicAuthorizationService,
  ) {
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  getDatosPersonales(): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.httpClient.get<any>(`${this.apiUrl}`,
      { headers: this.headerBasicAuthorization.getHeaders()}
    ).pipe(
      map(data => data),
      catchError((err) => {
        return of(err);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  updateDatosPersonales(updatePersonDto: any): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.httpClient.patch<any>(`${this.apiUrl}/update`, updatePersonDto,
      { headers: this.headerBasicAuthorization.getHeaders()}
    ).pipe(
      map(data => data),
      catchError((err) => {
        return of(err);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  updateAvatarPersona(updatePersonAvatarDto: any): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.httpClient.patch<any>(`${this.apiUrl}/update/avatar`, updatePersonAvatarDto,
      { headers: this.headerBasicAuthorization.getHeaders()}
    ).pipe(
      map(data => data),
      catchError((err) => {
        return of(err);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }

  updatePassword(updatePersonPasswordDto: any): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.httpClient.post<any>(`${this.apiUrl}/update/password`, updatePersonPasswordDto,
      { headers: this.headerBasicAuthorization.getHeaders()}
    ).pipe(
      map(data => data),
      catchError((err) => {
        return of(err);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    );
  }


  getComboPersonas(): Observable<any> {
    this.isLoadingSubject.next(true);
    return this.httpClient.get<any[]>(`${this.apiUrl}/listar`, { headers: this.headerBasicAuthorization.getHeaders() })
    .pipe(
        catchError((err) => {
          return of(err);
        }),
        finalize(() => this.isLoadingSubject.next(false))
    );
  }
}
