import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import Swal from 'sweetalert2';
import { UserService } from '../servicios/user.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit { 
  f_user = new FormGroup({
    user: new FormControl('', [Validators.required, Validators.minLength(4)]),
    pass: new FormControl('', [Validators.required, Validators.maxLength(10)])
  });

 
  constructor(private serv: UserService, private activatedRoute: ActivatedRoute) { }

  ngOnInit(): void {
    
  }
  onSubmit() {
    this.serv.verif(this.f_user.value['user'], this.f_user.value['pass']);
    this.confirmacion();
  }
  confirmacion() {
    Swal.fire({
      title: "Acceso Valido",
      icon: 'success',
    });
  }
}