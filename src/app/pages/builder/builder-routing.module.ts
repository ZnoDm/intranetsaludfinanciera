import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolComponent } from './rol/rol.component';
import { InformacionPersonalComponent } from './datos-personales/informacion-personal/informacion-personal.component';
import { CambiarPasswordComponent } from './datos-personales/cambiar-password/cambiar-password.component';
import { DatosPersonalesComponent } from './datos-personales/datos-personales.component';
import { PermisoComponent } from './permiso/permiso.component';
import { AsignarPermisosComponent } from './asignar-permisos/asignar-permisos.component';
import { UsuarioComponent } from './usuario/usuario.component';
import { BancoComponent } from './banco/banco.component';

const routes: Routes = [
  {
    path: '',
    children: [
      {
        path: '',
        redirectTo: '/dashboard',
        pathMatch: 'full',
      },
      
      {
        path: 'rol',
        component: RolComponent
      },

      {
        path: 'permiso',
        component: PermisoComponent
      },

      {
        path: 'asignar-permisos',
        component: AsignarPermisosComponent
      },

      { path: 'profile', redirectTo: '/profile/informacion-personal', pathMatch: 'full'},

      {
				path: 'profile',
				component: DatosPersonalesComponent,
        children: [
          {
            path: 'informacion-personal',
            component: InformacionPersonalComponent,
          },
          {
            path: 'change-password',
            component: CambiarPasswordComponent,
          },
          
        ]
			},

      {
        path: 'usuarios',
        component: UsuarioComponent
      },
      
      {
        path: 'banco',
        component: BancoComponent
      },
     
      {
        path: '**',
        redirectTo: 'error/404',
      },
    ],
  },
  
 
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class BuilderRoutingModule { }
