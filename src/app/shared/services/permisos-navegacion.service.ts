import { Injectable, OnDestroy, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { exhaustMap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HeaderBasicAuthorizationService } from './header-basic-authorization.service';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PermisosNavegacionService {

  private data: any = null;
  public data$ = new BehaviorSubject<any>(this.data);
  constructor(
    private httpClient: HttpClient,
    private headerBasicAuthorization: HeaderBasicAuthorizationService,
  ) {
  }

    set(data) {
      data.unshift({ "id": 0, "nombre": "Dashboard", "url": "/dashboard" });
      this.data$.next(data);      
    }

    getUrls() {
        return this.data$.value;
    }

    reset() {
      this.data = null;
      this.data$.next(this.data);
  }

}
