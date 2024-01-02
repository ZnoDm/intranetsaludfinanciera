import { Component, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ICreateAction, IEditAction, IDeleteAction, IDeleteSelectedAction, IFetchSelectedAction, IUpdateStatusForSelectedAction, ISortView, IFilterView, IGroupingView, ISearchView, PaginatorState, SortState, GroupingState, TableResponseModel } from 'src/app/_metronic/shared/crud-table';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { ToastrManager } from 'ng6-toastr-notifications';
import { SaveUpdateUsuarioComponent } from './save-update-usuario/save-update-usuario.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { TouchSequence } from 'selenium-webdriver';
import { AsignarRolEmpresaComponent } from './asignar-rol-empresa/asignar-rol-empresa.component';


@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.scss'],
})
export class UsuarioComponent implements OnInit { 
  // paginator: PaginatorState;
  load_data: boolean = true;
  no_data: boolean = false;
  searchBan: boolean = false;
  filterGroup: FormGroup;
  searchGroup: FormGroup;

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['Nro', 'Usuario', 'DocIdentidad', 'Login','Estado', 'actions'];

  @ViewChild(MatSort) MatSort: MatSort;
  // @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild('matPaginator', { static: true }) paginator: MatPaginator;

  array_estado: any = [
    { value: -1, descripcion: 'Todos' },
    { value: 1, descripcion: 'Activo' },
    { value: 0, descripcion: 'Inactivo' }
  ];

  array_tipo: any = [
    { value: 0, descripcion: 'Todos' },
    { value: 1, descripcion: 'TRABAJADORES' },
    { value: 2, descripcion: 'ALUMNOS' }
  ];


  
  private subscriptions: Subscription[] = [];
  viewsActions: Array<any> = [];
  array_data: TableResponseModel<any>;
  array_dataList: any;
  constructor(
    private fb: FormBuilder,
    private modalService: NgbModal,
		// public usuario_s: UsuarioService,
    // public certificado_s: CertificadosService,
     public toastr: ToastrManager,
  ) { }

  ngOnInit(): void {
    this.listData = new MatTableDataSource([]);
    this.filterForm();
    this.searchForm();

    this.getUsuarios(0,-1);    
  }

  getUsuarios(tipo,estado) {
    // this.listData = new MatTableDataSource([]);
    // this.searchBan = false;
    // this.load_data = false;
    // this.no_data = true;

    // this.usuario_s.GetUsuarios(tipo,estado).subscribe(
    //   (data:any) => {        
    //     this.load_data = true;
    //     this.searchBan = false;
    //     this.listData = new MatTableDataSource(data);
    //     if(data.length > 0){
    //       this.no_data = true;
    //     }else{
    //       this.no_data = false;
    //     }
    //     this.listData.sort = this.MatSort;
    //     this.listData.paginator = this.paginator;       
    //   }, ( errorServicio ) => {
    //     this.load_data = true;
    //     this.no_data = false;
    //     this.searchBan = false;        
    //   }
    // );

  }

  filterForm() {
    this.filterGroup = this.fb.group({
      Estado: [-1],
      Tipo: [0],
    });    
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
      this.getUsuarios(this.filterGroup.controls.Tipo.value,this.filterGroup.controls.Estado.value);
    }, (reason) => {
     
    }); 
  }

  reset(item) {
    const modalRef = this.modalService.open(ResetPasswordComponent, { size: 'ms' });
    modalRef.componentInstance.item = item;
    modalRef.result.then((result) => {
      this.getUsuarios(this.filterGroup.controls.Tipo.value,this.filterGroup.controls.Estado.value);
    }, (reason) => {
     
    }); 
  }

  asignar(idUsuario) {
    const modalRef = this.modalService.open(AsignarRolEmpresaComponent, { size: 'lg' });
    modalRef.componentInstance.idUsuario = idUsuario;
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

  delete(id: number) {
    // const modalRef = this.modalService.open(DeleteUsuarioModalComponent);
    // modalRef.componentInstance.id = id;
    // modalRef.componentInstance.titulo = 'Eliminar Usuario';
    // modalRef.componentInstance.descripcion = 'Esta seguro de eliminar el Usuario seleccionado?';
    // modalRef.componentInstance.msgloading = 'Eliminando Usuario...';
    // modalRef.result.then((result) => {
    //   this.getUsuarios(this.filterGroup.controls.Tipo.value,this.filterGroup.controls.Estado.value);
    // }, (reason) => {
     
    // }); 
  }

  enabledUsuario(item) {
		// this.usuario_s.EnableDisableUsuario(item.idUsuario, !item.activo).subscribe(
    //   (data:any) => {
    //     if (data[0].Success > 0) {
		// 			this.getUsuarios(this.filterGroup.controls.Tipo.value,this.filterGroup.controls.Estado.value);
    //       this.toastr.successToastr(data[0].Message, 'Correcto!', {
    //         toastTimeout: 2000,
    //         showCloseButton: true,
    //         animate: 'fade',
    //         progressBar: true
    //       });
    //     } else {
    //       item.Activo = item.Activo;
    //       this.toastr.errorToastr(data[0].Message, 'Error!', {
    //         toastTimeout: 2000,
    //         showCloseButton: true,
    //         animate: 'fade',
    //         progressBar: true
    //       });
    //     }
               
    //   }, ( errorServicio ) => { 
    //     this.toastr.errorToastr('Ocurrio un error.', 'Error!', {
    //       toastTimeout: 2000,
    //       showCloseButton: true,
    //       animate: 'fade',
    //       progressBar: true
    //     });       
    //     ;
    //   }
    // ); 
  }

}
