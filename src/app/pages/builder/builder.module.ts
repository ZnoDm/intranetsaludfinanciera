import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { GeneralModule } from '../../_metronic/partials/content/general/general.module';
import { BuilderComponent } from './builder.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgbAccordionModule, NgbDatepickerModule, NgbModalModule, NgbModule, NgbNavModule, NgbTimepickerModule, NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
import { HighlightModule } from 'ngx-highlightjs';
import { BuilderRoutingModule } from './builder-routing.module';

import { RolComponent } from './rol/rol.component';
import { SaveUpdateRolModalComponent } from './rol/save-update-rol-modal/save-update-rol-modal.component';
import { HttpClientModule } from '@angular/common/http';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSortModule } from '@angular/material/sort';
import { MatTableModule } from '@angular/material/table';
import { MatTreeModule } from '@angular/material/tree';
import { NgSelectModule } from '@ng-select/ng-select';
import { InlineSVGModule } from 'ng-inline-svg';
import { CRUDTableModule } from 'src/app/_metronic/shared/crud-table';

import { DatosPersonalesComponent } from './datos-personales/datos-personales.component';
import { InformacionPersonalComponent } from './datos-personales/informacion-personal/informacion-personal.component';
import { CambiarPasswordComponent } from './datos-personales/cambiar-password/cambiar-password.component';
import { PerfilOpcionesComponent } from './datos-personales/perfil-opciones/perfil-opciones.component';
import { PermisoComponent } from './permiso/permiso.component';
import { SaveUpdatePermisoModalComponent } from './permiso/save-update-permiso-modal/save-update-permiso-modal.component';
import { AsignarPermisosComponent } from './asignar-permisos/asignar-permisos.component';
@NgModule({
  declarations: [
    BuilderComponent,
    
    RolComponent,
    SaveUpdateRolModalComponent,
    
    PermisoComponent,
    SaveUpdatePermisoModalComponent,
    
    AsignarPermisosComponent,
    
    DatosPersonalesComponent,
    InformacionPersonalComponent,
    CambiarPasswordComponent,
    PerfilOpcionesComponent
  ],
  imports: [
    BuilderRoutingModule,
    CommonModule,
    FormsModule,
    GeneralModule,
    HighlightModule,
    NgbNavModule,
    NgbTooltipModule,
    RouterModule.forChild([
      {
        path: '',
        component: BuilderComponent,
      },
    ]),
     
    HttpClientModule,
    FormsModule,
    
    ReactiveFormsModule,
    InlineSVGModule,
    CRUDTableModule,
    NgbModalModule,
    NgbDatepickerModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatProgressSpinnerModule,
    MatIconModule,
    NgbAccordionModule,
    MatExpansionModule,
    MatFormFieldModule,
    NgbTimepickerModule,
    MatTreeModule,
    NgbModule,
    NgSelectModule
  ],
})
export class BuilderModule {}
