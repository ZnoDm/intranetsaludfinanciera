import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RolComponent } from './rol/rol.component';
import { LayoutComponent } from '../_layout/layout.component';
import { DatosPersonalesComponent } from './datos-personales/datos-personales.component';
import { InformacionPersonalComponent } from './datos-personales/informacion-personal/informacion-personal.component';
import { CambiarPasswordComponent } from './datos-personales/cambiar-password/cambiar-password.component';

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
        component: RolComponent
      },
      { path: 'datosPersonales', redirectTo: '/datosPersonales/informacionPersonal', pathMatch: 'full'},

      {
				path: 'datosPersonales',
				component: DatosPersonalesComponent,
        children: [
          {
            path: 'informacionPersonal',
            component: InformacionPersonalComponent,
          },
          {
            path: 'cambiarContraseña',
            component: CambiarPasswordComponent,
          },
          
        ]
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
