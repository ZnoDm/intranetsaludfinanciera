import { Component, OnInit,Input } from '@angular/core';
import { FormBuilder, FormGroup , Validators} from '@angular/forms';
import { CustomersService } from 'src/app/modules/e-commerce/_services';
import { Subscription } from 'rxjs';
import { NgbActiveModal, NgbDateAdapter, NgbDateParserFormatter } from '@ng-bootstrap/ng-bootstrap';
import { CustomAdapter, CustomDateParserFormatter } from 'src/app/_metronic/core';
import { BancoService } from 'src/app/shared/services/banco.service';
import { ToastrManager } from 'ng6-toastr-notifications';

@Component({
  selector: 'app-save-update-banco-modal',
  templateUrl: './save-update-banco-modal.component.html',
  styleUrls: ['./save-update-banco-modal.component.scss'],
  providers: [
    {provide: NgbDateAdapter, useClass: CustomAdapter},
    {provide: NgbDateParserFormatter, useClass: CustomDateParserFormatter}
  ]
})
export class SaveUpdateBancoModalComponent implements OnInit {

  @Input() item: any;
  isLoading$;
  id: number = 0;
  formGroup: FormGroup;
  private subscriptions: Subscription[] = [];

  constructor(
    private customersService: CustomersService,
    private fb: FormBuilder, 
    public modal: NgbActiveModal,
    public banco_s: BancoService,
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
      this.id = this.item.id;
      this.loadForm();  
      this.formGroup.controls.Nombre.setValue(this.item.nombre)       
    } else {
      
      this.id = 0;
      this.loadForm();
    }
  }
  loadForm() {
    this.formGroup = this.fb.group({
      Nombre: [null, Validators.compose([Validators.required])],
    });
  }
  private prepareCustomer() {
    const formData = this.formGroup.value;
    return{    
        nombre: formData.Nombre, 
      }
   
  }
  
  save() {
    let data = this.prepareCustomer();
    if(this.id == 0){
      this.banco_s.create(data).subscribe(
        (data:any) => {
          if (data.ok > 0) {
            this.toastr.successToastr(data.message, 'Correcto!', {
              toastTimeout: 2000,
              showCloseButton: true,
              animate: 'fade',
              progressBar: true
            });
            this.modal.close(true);  
          } else {
            this.toastr.errorToastr(data.message, 'Error!', {
              toastTimeout: 2000,
              showCloseButton: true,
              animate: 'fade',
              progressBar: true
            });
            this.modal.close(true);  
          }
                 
        }, ( errorServicio ) => { 
          this.toastr.errorToastr('Ocurrio un error.', 'Error!', {
            toastTimeout: 2000,
            showCloseButton: true,
            animate: 'fade',
            progressBar: true
          });       
          ;
        }
      );
    }else{
      this.banco_s.update(this.id,data).subscribe(
        (data:any) => {
          if (data.ok > 0) {
            this.toastr.successToastr(data.message, 'Correcto!', {
              toastTimeout: 2000,
              showCloseButton: true,
              animate: 'fade',
              progressBar: true
            });
            this.modal.close(true);  
          } else {
            this.toastr.errorToastr(data.message, 'Error!', {
              toastTimeout: 2000,
              showCloseButton: true,
              animate: 'fade',
              progressBar: true
            });
            this.modal.close(true);  
          }
                 
        }, ( errorServicio ) => { 
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
