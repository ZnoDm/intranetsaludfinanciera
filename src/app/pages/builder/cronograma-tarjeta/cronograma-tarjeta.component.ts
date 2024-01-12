import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from "@angular/material/sort";
import { MatPaginator } from "@angular/material/paginator";
import { Observable, Subscription } from 'rxjs';
import { TableResponseModel } from '../../../_metronic/shared/crud-table/models/table.model';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { CronogramaTarjetaService } from 'src/app/shared/services/cronograma-tarjeta.service';
import { SaveUpdateCronogramaTarjetaModalComponent } from './save-update-cronograma-tarjeta-modal/save-update-cronograma-tarjeta-modal.component';
import { DeleteModalComponent } from '../../shared/delete-modal/delete-modal.component';


@Component({
    selector: 'app-cronograma-tarjeta',
    templateUrl: './cronograma-tarjeta.component.html',
    styleUrls: ['./cronograma-tarjeta.component.scss'],
})
export class CronogramaTarjetaComponent implements OnInit {

    
  load_data: boolean = true;
  no_data: boolean = false;
  searchBan: boolean = false;

  searchGroup: FormGroup;

  listData: MatTableDataSource<any>;
  displayedColumns: string[] = ['Nro', 'banco', 'tipoCierre','anio', 'mes', 'periodo', 'actions'];

  @ViewChild(MatSort) MatSort: MatSort;
  @ViewChild('matPaginator', { static: true }) paginator: MatPaginator;

  array_data: TableResponseModel<any>;
  isLoading$: Observable<boolean>;
  
  private subscriptions: Subscription[] = [];

  constructor(
    private modalService: NgbModal,
    private fb: FormBuilder,
    public cronogramaTarjetaService: CronogramaTarjetaService,
    public toastr: ToastrManager,
    private chgRef: ChangeDetectorRef,) { 
      this.isLoading$ = this.cronogramaTarjetaService.isLoading$;
  }

  ngOnInit(): void {
    this.listData = new MatTableDataSource([]);
    this.searchForm();
    this.getCronogramaTarjetaes();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }



  searchForm() {
    this.searchGroup = this.fb.group({
      searchTerm: [''],
    });    
  }

  getCronogramaTarjetaes() {
    this.listData = new MatTableDataSource([]);
    this.searchBan = false;
    this.load_data = false;
    this.no_data = true;

    this.cronogramaTarjetaService.findAll().subscribe(
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
        this.chgRef.markForCheck();
      }, ( errorServicio ) => {           
        this.load_data = true;
        this.no_data = false;
        this.searchBan = false; 
      }
    );
  }

  create(item) {
    const modalRef = this.modalService.open(SaveUpdateCronogramaTarjetaModalComponent, { size: 'ms' });
    modalRef.componentInstance.item = item;
    modalRef.result.then((result) => {
      this.getCronogramaTarjetaes();     
    }, (reason) => {
     
    }); 
  }

  edit(item) {
    const modalRef = this.modalService.open(SaveUpdateCronogramaTarjetaModalComponent, { size: 'ms' });
    modalRef.componentInstance.item = item;
    modalRef.result.then((result) => {
      this.getCronogramaTarjetaes();
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
    modalRef.componentInstance.id = item.id;
    modalRef.componentInstance.titulo = 'Eliminar CronogramaTarjeta';
    modalRef.componentInstance.descripcion = `Esta seguro de eliminar el banco ${item.nombre} ?`;
    modalRef.componentInstance.msgloading = 'Eliminando CronogramaTarjeta...';
    modalRef.componentInstance.service = ()=>{
      return this.cronogramaTarjetaService.delete(item.id);
    };
    modalRef.result.then((result) => {
      this.getCronogramaTarjetaes();
    }, (reason) => {
      
    });  
  }


}

