import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastrManager } from 'ng6-toastr-notifications';

import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CustomAdapter, CustomDateParserFormatter } from 'src/app/_metronic/core';
import { PersonService } from 'src/app/shared/services/person.service';
@Component({
  selector: 'app-informacion-personal',
  templateUrl: './informacion-personal.component.html',
  styleUrls: ['./informacion-personal.component.scss'],
  providers: [DatePipe,
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class InformacionPersonalComponent implements OnInit {

  formDatosPersonales: FormGroup;
  subscriptions: Subscription[] = [];

  array_dataList: any;
  
  constructor(
    private fb: FormBuilder,
    public toastr: ToastrManager,
    private router: Router,
    private chgRef        : ChangeDetectorRef,
    private datePipe: DatePipe,
    private personService: PersonService
  ) { }

  ngOnInit(): void {
    this.datosForm();
    this.getDatos();
  }

  
  datosForm(){
    this.formDatosPersonales = this.fb.group({
      nombres: [null, Validators.compose([Validators.required])],
      apellidos: [null, Validators.compose([Validators.required])],
      telefono: [null, Validators.compose([Validators.required])],
      documentoIdentidad: [null, Validators.compose([Validators.required])],
    });
  }

  getDatos(){
    this.personService.findOne()
    .subscribe(
      (data:any) => { 
        console.log(data);
        this.formDatosPersonales.controls.nombres.setValue(data.person.nombres);
        this.formDatosPersonales.controls.apellidos.setValue(data.person.apellidos);
        this.formDatosPersonales.controls.telefono.setValue(data.person.telefono); 
        this.formDatosPersonales.controls.documentoIdentidad.setValue(data.person.documentoIdentidad); 

      }, ( errorServicio ) => {  }
    );
  }

  prepareDatos(){
    const controls = this.formDatosPersonales.controls;
    return {
        nombres: controls['nombres'].value,
        apellidos: controls['apellidos'].value,
        telefono: controls['telefono'].value,
        documentoIdentidad: controls['documentoIdentidad'].value,
      }
  }
  
  save(){
    const controls = this.formDatosPersonales.controls;

    if (this.formDatosPersonales.invalid) {
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

    let data = this.prepareDatos();
    
    this.personService.updateDatosPersonales(data).subscribe(
      (data: any) => {
           if (data.ok > 0) {
             this.toastr.successToastr(data.message, 'Correcto!', {
               toastTimeout: 2000,
               showCloseButton: true,
               animate: 'fade',
               progressBar: true
             });
             this.getDatos();
             this.chgRef.markForCheck();
           } else {
            this.toastr.errorToastr(data.message, 'Error!', {
               toastTimeout: 2000,
               showCloseButton: true,
               animate: 'fade',
               progressBar: true
             });
           }
         }, (errorServicio) => {

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


  isControlValid(controlName: string): boolean {
    const control = this.formDatosPersonales.controls[controlName];
    return control.valid && (control.dirty || control.touched);
  }

  isControlInvalid(controlName: string): boolean {
    const control = this.formDatosPersonales.controls[controlName];
    return control.invalid && (control.dirty || control.touched);
  }

  controlHasError(validation, controlName): boolean {
    const control = this.formDatosPersonales.controls[controlName];
    return control.hasError(validation) && (control.dirty || control.touched);
  }

  isControlTouched(controlName): boolean {
    const control = this.formDatosPersonales.controls[controlName];
    return control.dirty || control.touched;
  }

}
