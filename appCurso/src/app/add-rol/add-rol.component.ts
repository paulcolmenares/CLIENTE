import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { RolService } from '../servicios/rol.service';
import { RolesService } from '../servicios/roles.service';

@Component({
  selector: 'app-add-rol',
  templateUrl: './add-rol.component.html',
  styleUrls: ['./add-rol.component.css']
})
export class AddRolComponent implements OnInit {
  @ViewChild('form_rol') form_r?: NgForm;
  rol:any;
  constructor(private serv: RolService,
    private datos: RolesService,private router: Router) { }

  ngOnInit(): void {
    this.serv.grabar(this.form_r?.value).subscribe();
    console.log(this.form_r?.value);
    this.rol=this.datos.get();
  }
  Enviar(){
    this.serv.grabar(this.form_r?.value).subscribe();
    console.log(this.form_r?.value);
    this.router.navigate(['/list_rol'])
    this.confirmacion();   
   }
      confirmacion() {
       Swal.fire({
         title: "Se guardo corectamente",
         icon: 'success',
       });
     }
}
