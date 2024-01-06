import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Observable, Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ICreateAction, IEditAction, IDeleteAction, IDeleteSelectedAction, IFetchSelectedAction, IUpdateStatusForSelectedAction, ISortView, IFilterView, IGroupingView, ISearchView, PaginatorState, SortState, GroupingState, TableResponseModel } from 'src/app/_metronic/shared/crud-table';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrManager } from 'ng6-toastr-notifications';
import { SaveUpdateUsuarioComponent } from './save-usuario/save-usuario.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { TouchSequence } from 'selenium-webdriver';
import {UsuariosService } from 'src/app/shared/services/usuarios.service';
import { DeleteModalComponent } from '../../shared/delete-modal/delete-modal.component';
import { AsignarRolComponent } from './asignar-rol/asignar-rol.component';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
})
export class UsuarioComponent implements OnInit { 
  load_data: boolean = true;
  no_data: boolean = false;
  searchBan: boolean = false;

  searchGroup: FormGroup;

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['Nro', 'email', 'nombres', 'apellidos','tipoDocumentoIdentidad','documentoIdentidad','isActive', 'actions'];

  @ViewChild(MatSort) MatSort: MatSort;
  @ViewChild('matPaginator', { static: true }) paginator: MatPaginator;

  private subscriptions: Subscription[] = [];
  isLoading$: Observable<boolean>;
  
  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
		public usuarioService: UsuariosService,
    public toastr: ToastrManager,
  ) {
    this.isLoading$ = this.usuarioService.isLoading$;
   }

  ngOnInit(): void {
    this.listData = new MatTableDataSource([]);
    this.searchForm();

    this.getUsuarios();    
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }


  getUsuarios() {
    this.listData = new MatTableDataSource([]);
    this.searchBan = false;
    this.load_data = false;
    this.no_data = true;

    this.usuarioService.getUsers().subscribe(
      (data:any) => {    
        console.log(data);    
        this.load_data = true;
        this.searchBan = false;
        this.listData = new MatTableDataSource(data);
        if(data.length > 0){
          this.no_data = true;
        }else{
          this.no_data = false;
        }
        this.listData.sort = this.MatSort;
        this.listData.paginator = this.paginator;       
      }, ( errorServicio ) => {
        this.load_data = true;
        this.no_data = false;
        this.searchBan = false;        
      }
    );
  }



  searchForm() {
    this.searchGroup = this.fb.group({
      searchTerm: [''],
    });    
  }

  create(item) {
    const modalRef = this.modalService.open(SaveUpdateUsuarioComponent, { size: 'ms' });
    modalRef.componentInstance.item = item;
    modalRef.result.then((result) => {
      this.getUsuarios();
    }, (reason) => {
     
    }); 
  }

  reset(item) {
    const modalRef = this.modalService.open(ResetPasswordComponent, { size: 'ms' });
    modalRef.componentInstance.item = item;
    modalRef.result.then((result) => {
      this.getUsuarios();
    }, (reason) => {
     
    }); 
  }

  search() {
    if(this.searchGroup.controls.searchTerm.value == null) {
      this.searchGroup.controls.searchTerm.setValue('');
    }
    this.listData.filter = this.searchGroup.controls.searchTerm.value.trim().toLowerCase();
    if (this.listData.paginator) {
      this.listData.paginator.firstPage();
    }
  }

  asignar(item){
    const modalRef = this.modalService.open(AsignarRolComponent, { size: 'lg' });
    modalRef.componentInstance.id = item.id;
  }

  delete(item) {
    // const modalRef = this.modalService.open(DeleteModalComponent);
    // modalRef.componentInstance.id = item.id;
    // modalRef.componentInstance.titulo = 'Eliminar Usuario';
    // modalRef.componentInstance.descripcion = `Esta seguro de eliminar el usuario ${item.nombre} ?`;
    // modalRef.componentInstance.msgloading = 'Eliminando Usuario...';
    // modalRef.componentInstance.service = ()=>{
    //   //return this.rolService.delete(item.id);
    // };
    // modalRef.result.then((result) => {
    //   this.getUsuarios();
    // }, (reason) => {
      
    // });  
  }

  enabledUsuario(item) {
		this.usuarioService.enableDisableUser(item.id).subscribe(
      (data:any) => {
        if (data.ok > 0) {
					this.getUsuarios();
          this.toastr.successToastr(data.message, 'Correcto!', {
            toastTimeout: 2000,
            showCloseButton: true,
            animate: 'fade',
            progressBar: true
          });
        } else {
          item.Activo = item.Activo;
          this.toastr.errorToastr(data.message, 'Error!', {
            toastTimeout: 2000,
            showCloseButton: true,
            animate: 'fade',
            progressBar: true
          });
        }
               
      }, ( errorServicio ) => { 
        this.toastr.errorToastr('Ocurrio un error.', 'Error!', {
          toastTimeout: 2000,
          showCloseButton: true,
          animate: 'fade',
          progressBar: true
        });       
        ;
      }
    ); 
  }

}
