
import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Observable, of, Subscription } from 'rxjs';
import { catchError, finalize, first, tap, map, filter } from 'rxjs/operators';
import { Customer } from 'src/app/modules/e-commerce/_models/customer.model';
import { CustomersService } from 'src/app/modules/e-commerce/_services';
import { element } from 'protractor';
import { ItemsList } from '@ng-select/ng-select/lib/items-list';
import { CustomAdapter, CustomDateParserFormatter } from 'src/app/_metronic/core';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';

@Component({
  selector: 'app-asignar-rol',
  templateUrl: './asignar-rol.component.html',
  styleUrls: ['./asignar-rol.component.scss'],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class AsignarRolComponent implements OnInit {

  @Input() id: any;
  array_roles: any;

  private subscriptions: Subscription[] = [];
  isLoading$: Observable<boolean>;
  constructor( 
    public modal: NgbActiveModal, 
		public usuarioService: UsuariosService,
    public toastr: ToastrManager,
    ) {
      this.isLoading$ = this.usuarioService.isLoading$;
     }

  ngOnInit(): void {    
    this.getRoles();   
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }


  getRoles(){
    this.usuarioService.getAllRolesForUserWithFlag(this.id).subscribe(
      (data:any)=> {  
          this.array_roles = data;
        }, ( errorServicio ) => {           
          ;
        }
    );
	}

  changeChecked(idRol:number, active:boolean) {
    this.usuarioService.toggleRoleForUser(this.id,idRol,!active).
    subscribe((response: any) => {
       if (response.ok) {
         this.toastr.successToastr(response.Message, 'Éxito!', {
           toastTimeout: 2000,
           showCloseButton: true,
           animate: 'fade',
           progressBar: true
         });
         this.getRoles();
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
