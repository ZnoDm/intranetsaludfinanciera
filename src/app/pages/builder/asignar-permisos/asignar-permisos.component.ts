import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router } from '@angular/router';
import { FlatTreeControl } from '@angular/cdk/tree';
import { MatTreeFlatDataSource, MatTreeFlattener } from '@angular/material/tree';
import { PermisoService } from 'src/app/shared/services/permiso.service';
import { RolService } from 'src/app/shared/services/rol.service';

@Component({
  selector: 'app-asignar-permisos',
  templateUrl: './asignar-permisos.component.html',
  styleUrls: ['./asignar-permisos.component.scss']
})
export class AsignarPermisosComponent implements OnInit {


  filterGroup: FormGroup;

  array_roles: any = [];
  array_permisos: any = [];
  private subscriptions: Subscription[] = [];
  isLoading$: Observable<boolean>;
  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
    public toastr: ToastrManager,
    private router: Router,
    private permisoService: PermisoService,
    private rolService: RolService,
    private chgRef: ChangeDetectorRef, 
  ) { 
    this.isLoading$ = this.rolService.isLoading$;
  }

  ngOnInit(): void {  
    this.filterForm(); 
    this.getMainList();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }


  filterForm() {
    this.filterGroup = this.fb.group({
      Rol: [null]
    });    
  }

  getMainList(){
    this.rolService.findAll()
    .subscribe((response: any) => {
      this.array_roles = response;
      console.log(response)
      this.chgRef.markForCheck();  
    });
  }

  changeRol(Rol:number) {
    this.rolService.obtenerNavegacionPorRol(Rol)
      .subscribe((response: any) => {
        this.array_permisos = response;
        console.log(response)
        this.chgRef.markForCheck();   
      });
  }

  changeChecked(idPermiso:number, active:boolean) {
    this.rolService.asignarPermisoByRol(this.filterGroup.controls.Rol.value, idPermiso,!active).
    subscribe((response: any) => {
       if (response.ok) {
         this.toastr.successToastr(response.Message, 'Éxito!', {
           toastTimeout: 2000,
           showCloseButton: true,
           animate: 'fade',
           progressBar: true
         });
         this.changeRol(this.filterGroup.controls.Rol.value);
       } else {
         this.toastr.errorToastr(response.Message, 'Error!', {
           toastTimeout: 2000,
           showCloseButton: true,
           animate: 'fade',
           progressBar: true
         });
       }
     }, (error) => {
       this.toastr.errorToastr(error.error.Message, 'Error!', {
         toastTimeout: 2000,
         showCloseButton: true,
         animate: 'fade',
         progressBar: true
       });
     });
  }
}