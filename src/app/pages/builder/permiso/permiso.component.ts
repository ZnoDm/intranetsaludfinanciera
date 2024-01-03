import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { Observable, Subscription } from 'rxjs';
import { TableResponseModel } from '../../../_metronic/shared/crud-table/models/table.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { PermisoService } from 'src/app/shared/services/permiso.service';
import { SaveUpdatePermisoModalComponent } from './save-update-permiso-modal/save-update-permiso-modal.component';
import { DeleteModalComponent } from '../../shared/delete-modal/delete-modal.component';


@Component({
    selector: 'app-permiso',
    templateUrl: './permiso.component.html',
    styleUrls: ['./permiso.component.scss'],
})
export class PermisoComponent implements OnInit {

    
  load_data: boolean = true;
  no_data: boolean = false;
  searchBan: boolean = false;

  searchGroup: FormGroup;

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['Nro', 'Nombre', 'Url', 'actions'];

  @ViewChild(MatSort) MatSort: MatSort;
  @ViewChild('matPaginator', { static: true }) paginator: MatPaginator;

  array_data: TableResponseModel<any>;
  isLoading$: Observable<boolean>;
  
  private subscriptions: Subscription[] = [];

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    public permisoService: PermisoService,
    public toastr: ToastrManager,
    private chgRef: ChangeDetectorRef,) { 
      this.isLoading$ = this.permisoService.isLoading$;
  }

  ngOnInit(): void {
    this.listData = new MatTableDataSource([]);
    this.searchForm();
    this.getPermisoes();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }



  searchForm() {
    this.searchGroup = this.fb.group({
      searchTerm: [''],
    });    
  }

  getPermisoes() {
    this.listData = new MatTableDataSource([]);
    this.searchBan = false;
    this.load_data = false;
    this.no_data = true;

    this.permisoService.findAll().subscribe(
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
        this.chgRef.markForCheck();
      }, ( errorServicio ) => {           
        this.load_data = true;
        this.no_data = false;
        this.searchBan = false; 
      }
    );
  }

  create(item) {
    const modalRef = this.modalService.open(SaveUpdatePermisoModalComponent, { size: 'ms' });
    modalRef.componentInstance.item = item;
    modalRef.result.then((result) => {
      this.getPermisoes();     
    }, (reason) => {
     
    }); 
  }

  edit(item) {
    const modalRef = this.modalService.open(SaveUpdatePermisoModalComponent, { size: 'ms' });
    modalRef.componentInstance.item = item;
    modalRef.result.then((result) => {
      this.getPermisoes();
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

  delete(item) {
    const modalRef = this.modalService.open(DeleteModalComponent);
    modalRef.componentInstance.id = item.idCurso;
    modalRef.componentInstance.titulo = 'Eliminar Permiso';
    modalRef.componentInstance.descripcion = `Esta seguro de eliminar el permiso ${item.nombre} ?`;
    modalRef.componentInstance.msgloading = 'Eliminando Permiso...';
    modalRef.componentInstance.service = ()=>{
      return this.permisoService.delete(item.id);
    };
    modalRef.result.then((result) => {
      this.getPermisoes();
    }, (reason) => {
      
    });  
  }


}

