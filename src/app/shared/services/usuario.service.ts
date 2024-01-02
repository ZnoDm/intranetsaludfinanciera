import { Injectable, OnDestroy, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { exhaustMap, map, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment';
import { HeaderBasicAuthorizationService } from './header-basic-authorization.service';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(
    private httpClient: HttpClient,
    private headerBasicAuthorization: HeaderBasicAuthorizationService,
  ) {
  }

  public GetUsuarios(Tipo,Activo) {
    return this.httpClient.get(`${environment.apiUrl}/Usuario/IT_GetUsuarios?prmintTipo=${Tipo}&prmintActivo=${Activo}`,{
				headers: this.headerBasicAuthorization.getHeaders()
		}).pipe( map( data => data ));
  }

  
  public SaveUpdateUsuario(data: any) {
    return this.httpClient.post(`${environment.apiUrl}/Usuario/IT_SaveUpdateUsuario`,
    data,
    { headers: this.headerBasicAuthorization.getHeaders() }
    ).pipe( map( data => data ));
  }

  public EnableDisableUsuario(Usuario: number, Estado: any) {
    return this.httpClient.post(`${environment.apiUrl}/Usuario/IT_EnableDisableUsuario`,
      { prmintIdUsuario: Usuario, prmbitActivo: Estado },
      { headers: this.headerBasicAuthorization.getHeaders() }
      ).pipe( map( data => data ));
  }

  public DeleteUsuario(Usuario: number) {
    return this.httpClient.post(`${environment.apiUrl}/Usuario/IT_DeleteUsuario`,
      {prmintIdUsuario: Usuario},
      { headers: this.headerBasicAuthorization.getHeaders() }
      ).pipe( map( data => data ));
  }

  public ResetPasswordUsuario(Usuario: number, DocIdentidad: string) {
    return this.httpClient.post(`${environment.apiUrl}/Usuario/IT_ResetPasswordUsuario`,
      { prmintIdUsuario: Usuario, prmstrDocumentoIdentidad: DocIdentidad },
      { headers: this.headerBasicAuthorization.getHeaders() }
      ).pipe( map( data => data ));
  }

  public GetListarRoles() {
    return this.httpClient.get(`${environment.apiUrl}/Permiso/IT_GetListarRoles`,{
				headers: this.headerBasicAuthorization.getHeaders()
		}).pipe( map( data => data ));
  }


  //Asignar Usuario y Roles
  public GetEmpresasUsuario(Usuario: number){
    return this.httpClient.get(`${environment.apiUrl}/Usuario/IT_GetEmpresasUsuario?prmintidUsuario=${Usuario}`,
      { headers: this.headerBasicAuthorization.getHeaders() }
      ).pipe( map( data => data ));
  }
  public GetRolesUsuario(Usuario: number){
    return this.httpClient.get(`${environment.apiUrl}/Usuario/IT_GetRolesUsuario?prmintidUsuario=${Usuario}`,
      { headers: this.headerBasicAuthorization.getHeaders() }
      ).pipe( map( data => data ));
  }

  SaveUpdateRoleUsuario(Usuario: number, Rol: number, Estado: any) {
    return this.httpClient.post(`${environment.apiUrl}/Usuario/IT_SaveUpdateRolUsuario`, { IdUsuario: Usuario,IdRol: Rol,  Activo: Estado }, {
        headers: this.headerBasicAuthorization.getHeaders()
    }).pipe( map( data => data ));
  }
  SaveUpdateEmpresaUsuario(Usuario: number,Empresa: number, Estado: any) {
    return this.httpClient.post(`${environment.apiUrl}/Usuario/IT_SaveUpdateEmpresaUsuario`, { IdUsuario: Usuario,IdEmpresa: Empresa,  Activoo: Estado }, {
        headers: this.headerBasicAuthorization.getHeaders()
    }).pipe( map( data => data ));
  }
  SaveUpdateEmpresaRolUsuario(data: any) {
    return this.httpClient.post(`${environment.apiUrl}/Usuario/IT_SaveUpdateEmpresaRolUsuario`, data, {
        headers: this.headerBasicAuthorization.getHeaders()
    }).pipe( map( data => data ));
  }
}
