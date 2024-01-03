import { PersonService } from './../../../../shared/services/person.service';
import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { forkJoin, Subscription } from 'rxjs';
import { ConfirmPasswordValidator } from 'src/app/modules/auth/registration/confirm-password.validator';
import { ToastrManager } from 'ng6-toastr-notifications';
import { Router, ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-cambiar-password',
  templateUrl: './cambiar-password.component.html',
  styleUrls: ['./cambiar-password.component.scss']
})
export class CambiarPasswordComponent implements OnInit {

  formPassword: FormGroup;
  subscriptions: Subscription[] = [];
  constructor(
    private fb: FormBuilder,
    public personService: PersonService,
    public toastr: ToastrManager
  ) { }

  ngOnInit(): void {
    this.datosForm();
  }
    
  
  datosForm(){
    this.formPassword = this.fb.group({
      PasswordActual: [null, Validators.compose([Validators.required])],
      password: [null, Validators.compose([Validators.required])],
      cPassword: [null , Validators.compose([Validators.required])]
    },{
      validator: ConfirmPasswordValidator.MatchPassword
    });
  }

  preparePassword(){
    const formData = this.formPassword.value;
    return {
      oldPassword: formData.PasswordActual,
      newPassword: formData.password,
      confirmPassword: formData.cPassword
    }
  }

  save(){

    const controls = this.formPassword.controls;

    if (this.formPassword.invalid) {
			Object.keys(controls).forEach(controlName =>
				controls[controlName].markAsTouched()
			);
			this.toastr.warningToastr('Ingrese los campos obligatorios.', 'Advertencia!', {
				toastTimeout: 2000,
				showCloseButton: true,
				animate: 'fade',
				progressBar: true
			});
			return;
		}

    let data = this.preparePassword();
    this.personService.updatePassword(data).subscribe(
      (data: any) => {
        
           if (data.ok > 0) {
             this.toastr.successToastr(data.message, 'Correcto!', {
               toastTimeout: 2000,
               showCloseButton: true,
               animate: 'fade',
               progressBar: true
             });
            
           } else {

            this.toastr.errorToastr(data.message, 'Error!', {
               toastTimeout: 2000,
               showCloseButton: true,
               animate: 'fade',
               progressBar: true
             });
           }
         }, (errorServicio) => {

           this.toastr.errorToastr(errorServicio.message, 'Error!', {
             toastTimeout: 2000,
             showCloseButton: true,
             animate: 'fade',
             progressBar: true
           });
           ;
         }
      );
  }


  isControlValid(controlName: string): boolean {
    const control = this.formPassword.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formPassword.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(validation, controlName): boolean {
    const control = this.formPassword.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouched(controlName): boolean {
    const control = this.formPassword.controls[controlName];
    return control.dirty || control.touched;
  }
  
}
