import { StorageKeyEnum } from './../../../shared/enums/storage-key.enum';
import { Injectable, OnDestroy } from '@angular/core';
import { Observable, BehaviorSubject, of, Subscription } from 'rxjs';
import { map, catchError, switchMap, finalize, tap } from 'rxjs/operators';
import { UserModel } from '../_models/user.model';
import { AuthModel } from '../_models/auth.model';
import { AuthHTTPService } from './auth-http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { StorageService } from 'src/app/shared/services/storage.service';
import { HeaderBasicAuthorizationService } from 'src/app/shared/services/header-basic-authorization.service';
import { JwtService } from 'src/app/shared/services/jwt.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService implements OnDestroy {
  // private fields
  private unsubscribe: Subscription[] = []; // Read more: => https://brianflove.com/2016/12/11/anguar-2-unsubscribe-observables/

  // public fields
  currentUser$: Observable<UserModel>;
 
  currentUserSubject: BehaviorSubject<UserModel>;
  isLoadingSubject: BehaviorSubject<boolean>;
  isLoading$: Observable<boolean>;

  constructor(
    private authHttpService: AuthHTTPService,
    private router: Router,
    private storageService: StorageService,
    private httpClient: HttpClient,
    private headerBasicAuthorizationService: HeaderBasicAuthorizationService,
    private jwtService: JwtService
  ) {
    
    this.currentUserSubject = new BehaviorSubject<UserModel>(undefined);
    this.currentUser$ = this.currentUserSubject.asObservable();
    
    this.isLoadingSubject = new BehaviorSubject<boolean>(false);
    this.isLoading$ = this.isLoadingSubject.asObservable();
  }

  ngOnDestroy() {
    this.unsubscribe.forEach((sb) => sb.unsubscribe());
  }

  // public methods
  login(model:any){
    this.isLoadingSubject.next(true);
    return this.httpClient.post(`${environment.apiUrl}/auth/login`, model, {
    }).pipe(
      tap((response: any) => {            
          if (response.ok) {
            this.storageService.set(StorageKeyEnum.USER_DETAIL, JSON.stringify(response.user));
            this.currentUserSubject = new BehaviorSubject<UserModel>(response.user);
            this.storageService.set(StorageKeyEnum.JWT_AUTHORIZATION, response.token);
            this.jwtService.load(response.token);
            console.log(this.currentUserSubject);
          }
      }),
      catchError((err) => {
        return of(err);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    )
  }

  get currentUserValue(): UserModel {
    const user: UserModel = JSON.parse(this.storageService.get(StorageKeyEnum.USER_DETAIL));
    this.currentUserSubject = new BehaviorSubject<UserModel>(user);
    console.log(this.currentUserSubject.value)
    return this.currentUserSubject.value;
  }

  set currentUserValue(user: UserModel) {
    this.storageService.set(StorageKeyEnum.USER_DETAIL, JSON.stringify(user));
    this.currentUserSubject.next(user);
  }

  isLoggedIn() {
    let jwt: string = this.storageService.get(StorageKeyEnum.JWT_AUTHORIZATION);
    if (jwt != null) {
        this.jwtService.load(jwt);
        return this.jwtService.isValid();
    } else {
        return false;
    }
  }

  logout() {
    this.storageService.remove(StorageKeyEnum.JWT_AUTHORIZATION);
    this.jwtService.clear();
    this.router.navigate(['/auth/login'], {
      queryParams: {},
    });
  }

  refreshToken() {
    const auth = this.storageService.get(StorageKeyEnum.JWT_AUTHORIZATION)
    console.log(auth);
    if(!auth){
      return of(undefined)
    }
    this.isLoadingSubject.next(true);
    return this.httpClient.get(`${environment.apiUrl}/auth/check-status`, {
      headers: this.headerBasicAuthorizationService.getHeaders()
    }).pipe(
      tap((response: any) => {            
          if (response.ok) {
            console.log(response)
            this.storageService.set(StorageKeyEnum.USER_DETAIL, JSON.stringify(response.user));
            this.currentUserSubject = new BehaviorSubject<UserModel>(response.user);
            this.storageService.set(StorageKeyEnum.JWT_AUTHORIZATION, response.token);
            this.jwtService.load(response.token);
            console.log(this.currentUserSubject);
          } else {
            this.logout();
          }
      }),
      catchError((err) => {
        return of(err);
      }),
      finalize(() => this.isLoadingSubject.next(false))
    )
  }


  
  obtenerNavegacionPorUsuario() {
    this.isLoadingSubject.next(true);
    return this.httpClient.get(`${environment.apiUrl}/auth/permisos`,
      { headers: this.headerBasicAuthorizationService.getHeaders()
      }).pipe(
        catchError((err) => {
          return of(err);
        }),
        finalize(() => this.isLoadingSubject.next(false))
      );
  }

  redirectToLogin() {
    this.router.navigate(['/auth/login']);
  }

  redirectToMain() {
    this.router.navigate(['/']);
  }
}
