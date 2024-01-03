import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/modules/auth';
import { JwtService } from 'src/app/shared/services/jwt.service';
@Component({
  selector: 'app-perfil-opciones',
  templateUrl: './perfil-opciones.component.html',
  styleUrls: ['./perfil-opciones.component.scss']
})
export class PerfilOpcionesComponent implements OnInit {

  jwtUser: any = null;
  constructor(
    private auth: AuthService
  ) { }

  ngOnInit(): void {
    this.jwtUser = this.auth.currentUserSubject.value;
    console.log(this.jwtUser)
  }

}
