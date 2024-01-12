import { AuthService } from './../../modules/auth/_services/auth.service';
import { Injectable } from '@angular/core';
import { PermisosNavegacionService } from '../services/permisos-navegacion.service';
import {
  Router,
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import { map } from 'rxjs/operators';

@Injectable({ providedIn: 'root' })
export class LoggedInGuard implements CanActivate {
  constructor(
    private authService: AuthService,
    private permisosNavegacionService:PermisosNavegacionService
    ) {}

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {

    let stateUrl: string = state.url.split('?')[0];

    if (this.authService.isLoggedIn() && this.authService.currentUserValue) {
      if(this.permisosNavegacionService.getUrls.length <1){

        return this.authService.obtenerNavegacionPorUsuario()
        .pipe(map((response: any) => {
          this.permisosNavegacionService.set(response);
          let urlsObtenidas = this.permisosNavegacionService.getUrls();
          if(urlsObtenidas.some(elemento => elemento.url == stateUrl)){
            return true;
          }
          else{
            this.authService.redirectToMain();
            return false;
          }
        }));

      }else{
        let urlsObtenidas = this.permisosNavegacionService.getUrls();
        if(urlsObtenidas.some(elemento => elemento.url == stateUrl)){
          return true;
         }
         else{
          this.authService.redirectToMain();
          return false;
         }
      }
      return true;
    } else {
      this.authService.redirectToLogin();
      return false;
     
    }}
}
