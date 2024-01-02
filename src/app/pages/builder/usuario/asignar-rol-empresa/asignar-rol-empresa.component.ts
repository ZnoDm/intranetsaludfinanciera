
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { of, Subscription } from 'rxjs';
import { catchError, finalize, first, tap, map, filter } from 'rxjs/operators';
import { Customer } from 'src/app/modules/e-commerce/_models/customer.model';
import { CustomersService } from 'src/app/modules/e-commerce/_services';
import { element } from 'protractor';
import { ItemsList } from '@ng-select/ng-select/lib/items-list';
import { CustomAdapter, CustomDateParserFormatter } from 'src/app/_metronic/core';

@Component({
  selector: 'app-asignar-rol-empresa',
  templateUrl: './asignar-rol-empresa.component.html',
  styleUrls: ['./asignar-rol-empresa.component.scss'],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class AsignarRolEmpresaComponent implements OnInit {

  @Input() idUsuario: any;

  private subscriptions: Subscription[] = [];
	array_empresas: any;
  array_roles: any;

  dataEmpresaRolUsuario: any=[];
  hide_save: Boolean = false;
  constructor( 
    public modal: NgbActiveModal,
		// public rol_s: RolService,    
		// public usuario_s: UsuarioService,
    public toastr: ToastrManager,
    ) { }

  ngOnInit(): void {    
    this.getRoles();   
    this.getEmpresas();
  }

  
  getEmpresas() {
    // this.usuario_s.GetEmpresasUsuario(this.idUsuario).subscribe(
    //   (data:any)=> {  
    //       this.array_empresas = data;
    //     }, ( errorServicio ) => {           
    //       ;
    //     }
    // );   
  }

  getRoles(){
    // this.usuario_s.GetRolesUsuario(this.idUsuario).subscribe(
    //   (data:any)=> {  
    //       this.array_roles = data;
    //     }, ( errorServicio ) => {           
    //       ;
    //     }
    // );
	}

  onPressed(item,IdEmpresaRol,IdEmpresaRolUsuario,Activo,tipo:string){
    item.activo = !item.activo;
    let pos_existe = this.dataEmpresaRolUsuario.map(
      (element)=>{
        if(element.Tipo == tipo) 
          return element.IdEmpresaRol
      }).indexOf( IdEmpresaRol );
    if(pos_existe == -1 ){//-1 No existe
      this.dataEmpresaRolUsuario.push({
        IdUsuario: this.idUsuario,
        Tipo: tipo,
        IdEmpresaRol: IdEmpresaRol,
        IdEmpresaRolUsuario: IdEmpresaRolUsuario,
        Activo: !Activo
      });
    }else{      
      this.dataEmpresaRolUsuario[pos_existe].Activo = !Activo;
    }
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  save() {
    this.hide_save = true;
    // this.usuario_s.SaveUpdateEmpresaRolUsuario(this.dataEmpresaRolUsuario).subscribe(
    // (data:any) => {       
    //   if (data.Success > 0) {
    //     this.toastr.successToastr(data.Message, 'Correcto!', {
    //       toastTimeout: 2000,
    //       showCloseButton: true,
    //       animate: 'fade',
    //       progressBar: true
    //     });
    //     this.modal.close(true);  
    //   } else {
    //     this.toastr.errorToastr(data.Message, 'Error!', {
    //       toastTimeout: 2000,
    //       showCloseButton: true,
    //       animate: 'fade',
    //       progressBar: true
    //     });
    //     // this.modal.close(true);  
    //   }   
    // }, ( errorServicio ) => { 
    //   this.toastr.errorToastr('Ocurrio un error.', 'Error!', {
    //     toastTimeout: 2000,
    //     showCloseButton: true,
    //     animate: 'fade',
    //     progressBar: true
    //   });       
    //   ;
    // });  
  }
}
