import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { CustomersService } from 'src/app/modules/e-commerce/_services';
import { Subscription } from 'rxjs';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CustomAdapter, CustomDateParserFormatter } from 'src/app/_metronic/core';
import { RolService } from 'src/app/shared/services/rol.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-save-update-rol-modal',
  templateUrl: './save-update-rol-modal.component.html',
  styleUrls: ['./save-update-rol-modal.component.scss'],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class SaveUpdateRolModalComponent implements OnInit {
  @Input() item: any;
  isLoading$;
  idRol: number = 0;
  formGroup: FormGroup;
  private subscriptions: Subscription[] = [];

  constructor(
    private customersService: CustomersService,
    private fb: FormBuilder, 
    public modal: NgbActiveModal,
    public rol_s: RolService,
    public toastr: ToastrManager) { }

  ngOnInit(): void {
    this.isLoading$ = this.customersService.isLoading$;
    this.loadCustomer();
  }
  ngOnDestroy(): void {
    this.subscriptions.forEach(sb => sb.unsubscribe());
  }


  loadCustomer() {
    
    if (this.item !== null) {
      this.idRol = this.item.idRol;
      this.loadForm();  
      this.formGroup.controls.Nombre.setValue(this.item.nombre)
      this.formGroup.controls.Descripcion.setValue(this.item.descripcion);      
      this.formGroup.controls.Activo.setValue(this.item.activo);      
    } else {
      
      this.idRol = 0;
      this.loadForm();
    }
  }
  loadForm() {
    this.formGroup = this.fb.group({
      Nombre: [null, Validators.compose([Validators.required])],
      Descripcion: [null, Validators.compose([Validators.required])],
      Activo: [true],      
    });
  }
  private prepareCustomer() {
    const formData = this.formGroup.value;
    return {
      IdRol: this.idRol,      
      Nombre: formData.Nombre,
      Descripcion: formData.Descripcion,    
      Activo: formData.Activo
    }
    
  }
  
  save() {
    let data = this.prepareCustomer();
    // this.rol_s.SaveUpdateRol(data).subscribe(
    //   (data:any) => {
    //     if (data[0].Ok > 0) {
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
