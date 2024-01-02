import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ToastrManager } from 'ng6-toastr-notifications';

import { Router } from '@angular/router';
import { finalize } from 'rxjs/operators';
import { DatePipe } from '@angular/common';
import { NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CustomAdapter, CustomDateParserFormatter } from 'src/app/_metronic/core';
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
  


  array_sexos                   : any [];
  array_tipoDocumentoIdentidad  : any [];
  array_paises                  : any=[];
  array_departamentos           : any=[];
  array_provincias              : any=[];
  array_distritos               : any=[];
  array_estadoCivil             : any=[];


  constructor(
    private fb: FormBuilder,
    // public datosPersonales_s: DatosPersonalesService,
    public toastr: ToastrManager,
    private router: Router,
    private chgRef        : ChangeDetectorRef,
    // private multitabla_s  : MultitablaService,
    private datePipe: DatePipe,
  ) { }

  ngOnInit(): void {
    this.datosForm();
    this.getSexo();
    this.getTipoDocIdentidad();
    this.getDepartamento(1);
    this.getEstadoCivil();
    this.getTrabajador();
  }

  
  datosForm(){
    this.formDatosPersonales = this.fb.group({
      nombres: [null, Validators.compose([Validators.required])],
      apePaterno: [null, Validators.compose([Validators.required])],
      apeMaterno: [null, Validators.compose([Validators.required])],
      telefono: [null],
      celular: [null, Validators.compose([Validators.required])],
      email: [null],
      fechaNacimiento : [null],
			idSexo : [null],    
			idTipoDocumentoIdentidad : [null],  
			documentoIdentidad : [null],  
      idPais: [1],  
			idDepartamento : [null], 
			idProvincia : [null],  
			idDistrito : [null],  
			idEstadoCivil : [null],  
			tieneHijos : [null],  
			cantidadHijos : [null],
    });
  }

  getTrabajador(){
    // this.datosPersonales_s.GetTrabajadorAlumnoByUsuario()
    // .pipe( finalize(()=>{}))
    // .subscribe(
    //   (data:any) => {
    //     let dataGenerales = data[0]; 
    //     this.formDatosPersonales.controls.nombres.setValue(dataGenerales.nombres);
    //     this.formDatosPersonales.controls.apePaterno.setValue(dataGenerales.apePaterno);
    //     this.formDatosPersonales.controls.apeMaterno.setValue(dataGenerales.apeMaterno);
    //     this.formDatosPersonales.controls.telefono.setValue(dataGenerales.telefono);
    //     this.formDatosPersonales.controls.celular.setValue(dataGenerales.celular);
    //     this.formDatosPersonales.controls.email.setValue(dataGenerales.email);
    //     this.formDatosPersonales.controls.fechaNacimiento.setValue(dataGenerales.fechaNacimiento == null ? null : this.datePipe.transform(dataGenerales.fechaNacimiento, 'yyyy-MM-dd'));
    //     this.formDatosPersonales.controls.idSexo.setValue(dataGenerales.idSexo);
    //     this.formDatosPersonales.controls.idTipoDocumentoIdentidad.setValue(dataGenerales.idTipoDocumentoIdentidad);
    //     this.formDatosPersonales.controls.documentoIdentidad.setValue(dataGenerales.documentoIdentidad);
    //     this.formDatosPersonales.controls.idPais.setValue(dataGenerales.idPais);
    //     this.formDatosPersonales.controls.idDepartamento.setValue(dataGenerales.idDepartamento);
    //     this.formDatosPersonales.controls.idProvincia.setValue(dataGenerales.idProvincia);
    //     this.formDatosPersonales.controls.idDistrito.setValue(dataGenerales.idDistrito);
    //     this.formDatosPersonales.controls.idEstadoCivil.setValue(dataGenerales.idEstadoCivil);
    //     this.formDatosPersonales.controls.tieneHijos.setValue( dataGenerales.tieneHijos == true ? 'Si' : 'No');
    //     this.formDatosPersonales.controls.cantidadHijos.setValue(dataGenerales.cantidadHijos);   
    //     this.getProvincia(dataGenerales.idDepartamento ?? null, dataGenerales.idProvincia ?? null);
    //     this.getDistrito(dataGenerales.idProvincia ?? null ,dataGenerales.idDistrito ?? null);

    //   }, ( errorServicio ) => {  }
    // );
  }

  prepareDatos(){
    const controls = this.formDatosPersonales.controls;
    return {
      Alumno: {
        nombres: controls['nombres'].value,
        apePaterno: controls['apePaterno'].value,
        apeMaterno: controls['apeMaterno'].value,
        fechaNacimiento: controls['fechaNacimiento'].value == "" || controls['fechaNacimiento'].value == null ? null : controls['fechaNacimiento'].value,
        idSexo: controls['idSexo'].value,
        idTipoDocumentoIdentidad: controls['idTipoDocumentoIdentidad'].value,
        documentoIdentidad: controls['documentoIdentidad'].value,
        telefono: controls['telefono'].value,
        celular: controls['celular'].value,
        email: controls['email'].value,
        idPais: controls['idPais'].value,
        idDepartamento: controls['idDepartamento'].value,
        idProvincia: controls['idProvincia'].value,
        idDistrito: controls['idDistrito'].value,
        idEstadoCivil: controls['idEstadoCivil'].value,
        tieneHijos: controls['tieneHijos'].value  === 'Si' ? 1 : 0,
        cantidadHijos: controls['cantidadHijos'].value ?? 0,
      }
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
    
    // this.datosPersonales_s.UpdateTrabajadorAlumno(data).subscribe(
    //   (data: any) => {
    //        if (data[0].Ok > 0) {
    //          this.toastr.successToastr(data[0].Message, 'Correcto!', {
    //            toastTimeout: 2000,
    //            showCloseButton: true,
    //            animate: 'fade',
    //            progressBar: true
    //          });
    //          this.getTrabajador()
    //          this.chgRef.markForCheck();
    //        } else {

    //         this.toastr.errorToastr(data[0].Message, 'Error!', {
    //            toastTimeout: 2000,
    //            showCloseButton: true,
    //            animate: 'fade',
    //            progressBar: true
    //          });
    //        }
    //      }, (errorServicio) => {

    //        this.toastr.errorToastr('Ocurrio un error.', 'Error!', {
    //          toastTimeout: 2000,
    //          showCloseButton: true,
    //          animate: 'fade',
    //          progressBar: true
    //        });
    //        ;
    //      }
    //   );
  }

  getSexo() {
		// this.multitabla_s.GetListarSexos().subscribe(
		// 	(data: any) => {
		// 		this.array_sexos = data;
    //     this.chgRef.markForCheck();
		// 	}, (errorServicio) => {
		// 		;
		// 	}
		// );
	}

  getTipoDocIdentidad(){
		// this.multitabla_s.GetTipoDocumentoIdentidad().subscribe(
		// 	(data:any)=>{
		// 		this.array_tipoDocumentoIdentidad = data;
    //     this.chgRef.markForCheck();
		// 	}, (errorServicio)=>{
				
		// 	}
		// )
	}

  getDepartamento(Pais) {
    // this.multitabla_s.GetListarDepartamentos(Pais)
    //   .subscribe(
    //     (data:any) => {
    //       this.array_departamentos = data;
    //     }, ( errorServicio ) => {
    //       ;
    //     }
    //   );
  }

  getProvincia(Departamento: Event,PosibleValor) {
    this.formDatosPersonales.controls['idProvincia'].reset();
    this.array_provincias = []
    this.formDatosPersonales.controls['idDistrito'].reset();
    this.array_distritos = []
    if(Departamento !==null)
    {}
    // this.multitabla_s.GetListarProvincia(Departamento)
    //   .subscribe(
    //     (data:any) => {
    //       this.array_provincias = data;
    //       if(PosibleValor!== null){
    //         this.formDatosPersonales.controls.idProvincia.setValue(PosibleValor)
    //       }
    //     }, ( errorServicio ) => {
    //       ;
    //     }
    //   );
  }

  getDistrito(Provincia: Event,PosibleValor) {
    this.formDatosPersonales.controls['idDistrito'].reset();
    this.array_distritos = []
    if(Provincia !==null)
    // this.multitabla_s.GetListarDistrito(Provincia)
    //   .subscribe(
    //     (data:any) => {
    //       this.array_distritos = data;
    //       if(PosibleValor!== null){
    //         this.formDatosPersonales.controls.idDistrito.setValue(PosibleValor)
    //       }
    //       this.chgRef.markForCheck();
    //     }, ( errorServicio ) => {
    //       ;
    //     }
    //   );
    {}
  }

  getEstadoCivil() {
		// this.multitabla_s.GetListarEstadoCivil().subscribe(
		// 	(data: any) => {
		// 		this.array_estadoCivil = data;
    //     this.chgRef.markForCheck();
		// 	}, (errorServicio) => {

		// 		;
		// 	}
		// );
	}

  radioHasHijos(event: Event) {
    const option = (event.target as HTMLInputElement).value;
    this.formDatosPersonales.get('cantidadHijos').setValue(null);
    if (option === 'Si') {
      this.formDatosPersonales.get('cantidadHijos').enable();
    } else {
      this.formDatosPersonales.get('cantidadHijos').disable();
    }
    this.formDatosPersonales.get('cantidadHijos').updateValueAndValidity();
    this.chgRef.markForCheck();
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
