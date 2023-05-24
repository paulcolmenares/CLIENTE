import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MenuesService } from '../servicios/menues.service';
import { MenusService } from '../servicios/menus.service';

@Component({
  selector: 'app-add-menu',
  templateUrl: './add-menu.component.html',
  styleUrls: ['./add-menu.component.css']
})
export class AddMenuComponent implements OnInit {
  @ViewChild('form_menu') form_me?: NgForm;
  menu:any;

  constructor(private serv : MenusService, private datos : MenuesService,
    private router: Router) { }

  ngOnInit(): void {
    this.menu=this.datos.get();
  }
  Enviar(){
    this.serv.grabar(this.form_me?.value).subscribe();
    console.log(this.form_me?.value);
    
    this.router.navigate(['/list_menu'])
    this.confirmacion();   
   }
      confirmacion() {
       Swal.fire({
         title: "Se guardo corectamente",
         icon: 'success',
       });
     }

}
