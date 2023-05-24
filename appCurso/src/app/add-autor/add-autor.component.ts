import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AutorService } from '../servicios/autor.service';
import { AutoresService } from '../servicios/autores.service';


@Component({
  selector: 'app-add-autor',
  templateUrl: './add-autor.component.html',
  styleUrls: ['./add-autor.component.css']
})
export class AddAutorComponent implements OnInit {
  autor: any;
  @ViewChild('form_autor') form_autor?: NgForm;
  

  constructor(private autor_serv:  AutorService, private serv2: AutoresService,
    private router: Router) { }

  ngOnInit(): void {
    this.autor=this.serv2.get();
  }
 Enviar(){

 this.autor_serv.grabar(this.form_autor?.value).subscribe(data=> console.log(data) );
 this.router.navigate(['/listar_autor'])
 this.confirmacion();   
}
   confirmacion() {
    Swal.fire({
      title: "Se guardo corectamente",
      icon: 'success',
    });
  }

}
