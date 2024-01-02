import { Component, OnInit } from '@angular/core';

import { Router } from '@angular/router';
@Component({
  selector: 'app-datos-personales',
  templateUrl: './datos-personales.component.html',
  styleUrls: ['./datos-personales.component.scss']
})
export class DatosPersonalesComponent implements OnInit {

  constructor(private router: Router,) { }

  ngOnInit(): void {
    
  }
  tutorialStart(){
    let _tutorial = JSON.parse(localStorage.getItem('tutorial')!) || [];
    let personal = _tutorial.indexOf('personal');
    let password =  _tutorial.indexOf('password');

    if(( personal != -1) ){
      _tutorial.splice(personal,1)
    }
    if(( password != -1)){
      _tutorial.splice(password,1)
    }
    
    localStorage.setItem('tutorial', JSON.stringify(_tutorial));
    
    this.router.navigateByUrl('/Loading', {skipLocationChange: true}).then(()=>
      this.router.navigate(['/Security/masters/DatosPersonales/InformacionPersonal'])
    );

  }
}
