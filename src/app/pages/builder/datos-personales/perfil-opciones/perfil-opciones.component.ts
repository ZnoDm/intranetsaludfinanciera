import { Component, OnInit } from '@angular/core';
import { JwtService } from 'src/app/shared/services/jwt.service';
@Component({
  selector: 'app-perfil-opciones',
  templateUrl: './perfil-opciones.component.html',
  styleUrls: ['./perfil-opciones.component.scss']
})
export class PerfilOpcionesComponent implements OnInit {

  jwtUser: any = null;
  constructor(
    private jwtService: JwtService
  ) { }

  ngOnInit(): void {
    this.jwtUser = this.jwtService.getUser();
  }

}
