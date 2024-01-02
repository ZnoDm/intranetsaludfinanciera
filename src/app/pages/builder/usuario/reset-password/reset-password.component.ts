import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { ToastrManager } from 'ng6-toastr-notifications';
import { of, Subscription } from 'rxjs';
import { catchError, delay, finalize, tap } from 'rxjs/operators';


@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss']
})
export class ResetPasswordComponent implements OnInit {
  @Input() item: any;
  @Input() titulo: string;
  @Input() msgloading: string;
  @Input() descripcion: string;
  isLoading = false;
  subscriptions: Subscription[] = [];

  constructor(
		// public usuario_s: UsuarioService,
    public modal: NgbActiveModal,
    public toastr: ToastrManager,
  ) { }

  ngOnInit(): void {
  }

  restartPassword() {
    this.isLoading = true;
		// this.usuario_s.ResetPasswordUsuario(this.item.idUsuario,'123456').subscribe(
    //   (data:any) => {
    //     if (data[0].Success > 0) {
    //       this.isLoading = false;
    //       this.toastr.successToastr(data[0].Message, 'Correcto!', {
    //         toastTimeout: 2000,
    //         showCloseButton: true,
    //         animate: 'fade',
    //         progressBar: true
    //       });

    //       this.modal.close(true);  
    //     } else {
    //       this.isLoading = false;
    //       this.toastr.errorToastr(data[0].Message, 'Error!', {
    //         toastTimeout: 2000,
    //         showCloseButton: true,
    //         animate: 'fade',
    //         progressBar: true
    //       });
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
}
