import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { of, Subscription } from 'rxjs';
import { catchError, finalize, first, tap } from 'rxjs/operators';
import { CustomAdapter, CustomDateParserFormatter } from 'src/app/_metronic/core';
import { Customer } from 'src/app/modules/e-commerce/_models/customer.model';
import { CustomersService } from 'src/app/modules/e-commerce/_services';import { PersonService } from 'src/app/shared/services/person.service';
import { UsuariosService } from 'src/app/shared/services/usuarios.service';
import { RolService } from '../../../../shared/services/rol.service';
;

@Component({
  selector: 'app-update-usuario',
  templateUrl: './save-usuario.component.html',
  styleUrls: ['./save-usuario.component.scss'],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class SaveUpdateUsuarioComponent implements OnInit {
  @Input() item: any;
  isLoading$;
  idUsuario: number = 0;
  formGroup: FormGroup;
  private subscriptions: Subscription[] = [];

	array_roles: any;
  array_personas: any;


  constructor(
    private userService:UsuariosService,
    private personService: PersonService,
    private rolService:RolService,
    private fb: FormBuilder, 
    public modal: NgbActiveModal,
    public toastr: ToastrManager,
    ) { }

  ngOnInit(): void {
    this.isLoading$ = this.userService.isLoading$;
    this.loadUsuario();
 
  }

	getRoles(PosibleValor){
		this.rolService.getComboRoles().subscribe(
			(data:any)=>{
				this.array_roles = data;
				if(PosibleValor !== null){
					this.formGroup.controls.Rol.setValue(PosibleValor);
				}
			}, (errorServicio)=>{
				;
			}
		);
	}

  getPersonas(PosibleValor){
		this.personService.getComboPersonas().subscribe(
			(data:any)=>{
				this.array_roles = data;
				if(PosibleValor !== null){
					this.formGroup.controls.Persona.setValue(PosibleValor);
				}
			}, (errorServicio)=>{
				;
			}
		);
	}

  loadUsuario() {
    // if (this.item !== null) {
    //   this.idUsuario = this.item.idUsuario;
    //   this.loadForm();    
   
    //   this.formGroup.controls.Email.setValue(this.item.email);  
    //   this.formGroup.controls.Password.setValue(this.item.password);    
    //   this.formGroup.controls.Activo.setValue(this.item.activo);   
    //   this.getPersonas();
    //   this.getRoles();   
    // } else {
    this.idUsuario = 0;
    this.loadForm();
    this.getPersonas(null);
    this.getRoles(null);
  }  

  loadForm() {
    this.formGroup = this.fb.group({
			Email: [null, Validators.compose([Validators.required])],
			Password: [null, Validators.compose([Validators.required])],
      Rol: [null, Validators.compose([Validators.required])],
      Persona: [null, Validators.compose([Validators.required])],
      Activo: [true],      
    });
  }


  save() {
    let data = this.prepareUsuario();
    
    
		// this.usuario_s.SaveUpdateUsuario(data).subscribe(
    //   (data:any) => {
    //     if (data[0].Success > 0) {
    //       this.toastr.successToastr(data[0].Message, 'Correcto!', {
    //         toastTimeout: 2000,
    //         showCloseButton: true,
    //         animate: 'fade',
    //         progressBar: true
    //       });

    //       this.modal.close(true);  
    //     } else {
    //       this.toastr.errorToastr(data[0].Message, 'Error!', {
    //         toastTimeout: 2000,
    //         showCloseButton: true,
    //         animate: 'fade',
    //         progressBar: true
    //       });
    //       // this.modal.close(true);  
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

  private prepareUsuario() {
    const formData = this.formGroup.value;
    return {
      idUsuario: this.idUsuario,
			idTrabajador: formData.Trabajador,
      idAlumno: formData.Alumno,
			login: formData.Login,
			password: formData.Password,
      activo: formData.Activo,      
    }
    
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }

  // helpers for View
  isControlValid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formGroup.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(validation, controlName): boolean {
    const control = this.formGroup.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouched(controlName): boolean {
    const control = this.formGroup.controls[controlName];
    return control.dirty || control.touched;
  }
}
