import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TelefonoService } from '../servicios/telefono.service';
import { UsuarioService } from '../servicios/usuario.service';

@Component({
  selector: 'app-telefono',
  templateUrl: './telefono.component.html',
  styleUrls: ['./telefono.component.css']
})
export class TelefonoComponent implements OnInit {
  lista: any=[];
  tel: any=[];

  @ViewChild('form_telefono') form_tel?: NgForm;
  
 
  constructor( private serv: TelefonoService,  private serv1: UsuarioService,
    private router: Router) { }

  ngOnInit(): void {
 
    this.serv1.list().subscribe(data => this.lista=data._embedded.personae);
    this.serv.list().subscribe(data => this.tel=data._embedded.telefonoes);
  }
  Enviar(){
    this.serv.grabar(this.form_tel?.value).subscribe(data=> console.log(data));
    
   this.confirmacion();
  }
    
     confirmacion() {
      Swal.fire({
        title: "Se guardo corectamente",
        icon: 'success',
      });
    }
  
    Eliminar(element: any) {
      Swal.fire({
        title: "Seguro de Eliminar Datos del Telefono",
        text: "¿Eliminar?",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: "Aceptar",
        cancelButtonText: "Cancelar",
      })
        .then(resultado => {
          if (resultado.value) {
            this.eliminar(element._links.self.href),
              console.log('Borrado');
          } else {
            console.log("Cancelado");
          }
        });
    }
    public eliminar(area:string){
      this.serv.borrar(area).subscribe(data => this.ngOnInit());
  
    }
}
