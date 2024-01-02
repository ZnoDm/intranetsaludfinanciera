import { Component, OnInit , ViewChild} from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Navigation } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Subscription } from 'rxjs';
import { TableResponseModel } from 'src/app/_metronic/shared/crud-table';
import { RolService } from 'src/app/shared/services/rol.service';
import { SaveUpdateRolModalComponent } from './save-update-rol-modal/save-update-rol-modal.component';

@Component({
    selector: 'app-rol',
    templateUrl: './rol.component.html',
    styleUrls: ['./rol.component.scss'],
})
export class RolComponent implements OnInit {

    
  load_data: boolean = true;
  no_data: boolean = false;
  searchBan: boolean = false;
  filterGroup: FormGroup;
  searchGroup: FormGroup;

  array_estado: any = [
    { value: -1, descripcion: 'Todos' },
    { value: 1, descripcion: 'Activo' },
    { value: 0, descripcion: 'Inactivo' }
  ];

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['Nro', 'Nombre', 'Descripcion', 'Estado', 'actions'];

  @ViewChild(MatSort) MatSort: MatSort;
  @ViewChild('matPaginator', { static: true }) paginator: MatPaginator;

  private subscriptions: Subscription[] = [];
  viewsActions: Array<Navigation> = [];
  array_data: TableResponseModel<any>;
  array_dataList: any;
  array_roles: any;

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    public rol_s: RolService,
    public toastr: ToastrManager) { 
  }

  ngOnInit(): void {
    
    this.listData = new MatTableDataSource([]);
    // this.filterForm();
    this.searchForm();
    this.getRoles();
  }
  // filterForm() {
  //   this.filterGroup = this.fb.group({
  //     Estado: [-1],
  //   });    
  // }
  searchForm() {
    this.searchGroup = this.fb.group({
      searchTerm: [''],
    });    
  }
  getRoles() {
    this.listData = new MatTableDataSource([]);
    this.searchBan = false;
    this.load_data = false;
    this.no_data = true;

    this.rol_s.findAll().subscribe(
      (data:any) => {
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
  create(item) {
    const modalRef = this.modalService.open(SaveUpdateRolModalComponent, { size: 'ms' });
    modalRef.componentInstance.item = item;
    modalRef.result.then((result) => {
      this.getRoles();     
    }, (reason) => {
     
    }); 
  }
  edit(item) {
    const modalRef = this.modalService.open(SaveUpdateRolModalComponent, { size: 'ms' });
    modalRef.componentInstance.item = item;
    modalRef.result.then((result) => {
      this.getRoles();
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

  enabledDisabledRol(item) {
		// this.rol_s.EnableDisableRol(item.idRol, !item.activo).subscribe(
    //   (data:any) => {
    //     if (data[0].Success > 0) {
		// 			this.getRoles(this.filterGroup.controls.Estado.value);
          // this.toastr.successToastr(data[0].Message, 'Correcto!', {
          //   toastTimeout: 2000,
          //   showCloseButton: true,
          //   animate: 'fade',
          //   progressBar: true
          // });
        // } else {
        //   item.Activo = item.Activo;
          // this.toastr.errorToastr(data[0].Message, 'Error!', {
          //   toastTimeout: 2000,
          //   showCloseButton: true,
          //   animate: 'fade',
          //   progressBar: true
          // });
        // }
               
      // }, ( errorServicio ) => { 
        // this.toastr.errorToastr('Ocurrio un error.', 'Error!', {
        //   toastTimeout: 2000,
        //   showCloseButton: true,
        //   animate: 'fade',
        //   progressBar: true
        // });       
    //     ;
    //   }
    // ); 
  }
  delete(item) {
    // const modalRef = this.modalService.open(DeleteRolModalComponent);
    // modalRef.componentInstance.id = item.idRol;
    
    // modalRef.componentInstance.nombre = item.nombre;
    // modalRef.componentInstance.titulo = 'Eliminar Rol';
    // modalRef.componentInstance.descripcion = 'Esta seguro de eliminar el siguiente Rol';
    // modalRef.componentInstance.msgloading = 'Eliminando Rol...';
    // modalRef.result.then((result) => {
    //   this.getRoles(this.filterGroup.controls.Estado.value);
    // }, (reason) => {
     
    // }); 
  }


}

