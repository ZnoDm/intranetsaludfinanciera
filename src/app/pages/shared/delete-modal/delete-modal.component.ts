import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { of, Subscription } from 'rxjs';
import { catchError, delay, finalize, tap } from 'rxjs/operators';


@Component({
  selector: 'app-delete-modal',
  templateUrl: './delete-modal.component.html',
  styleUrls: ['./delete-modal.component.scss']
})
export class DeleteModalComponent implements OnInit {
  @Input() id: number; // no necesario
	@Input() service: any;	// callback que retornará el metodoDelete del servicio deseado
	@Input() params: any[]; // no ncesario
  @Input() titulo: string; // titulo del modal
  @Input() msgloading: string; // mensaje a mostrar mientras se ejecuta la funcion
  @Input() descripcion: string; // cuerpo del modal
  isLoading = false;
  subscriptions: Subscription[] = [];

  constructor(
    public modal: NgbActiveModal,
    public toastr: ToastrManager,
  ) { }

  ngOnInit(): void {
  }
// Ejemplo de uso en PostulanteComponent
	delete(){
		this.isLoading = true;
		this.service().subscribe(   // suscripcion al observable que retorna el metodo del servicio
      (data:any) => {
        if (data.ok == true) {
          this.isLoading = false;
          this.toastr.successToastr(data.message, 'Correcto!', {
            toastTimeout: 2000,
            showCloseButton: true,
            animate: 'fade',
            progressBar: true
          });

          this.modal.close(true);  
        } else {
          if (data?.status > 0) {
            this.isLoading = false;
            this.toastr.warningToastr(data.message, 'Advertencia!', {
              toastTimeout: 3000,
              showCloseButton: true,
              animate: 'fade',
              progressBar: true
            });  
            this.modal.close(true);  
            
          } else {
            this.isLoading = false;
            this.toastr.errorToastr(data.message, 'Error!', {
              toastTimeout: 2000,
              showCloseButton: true,
              animate: 'fade',
              progressBar: true
            });
          }
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
