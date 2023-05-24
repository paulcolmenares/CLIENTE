import { Component, EventEmitter, OnInit, Output, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { jsPDF } from 'jspdf';
import Swal from 'sweetalert2';
import { AutorService } from '../servicios/autor.service';
import { AutoresService } from '../servicios/autores.service';

@Component({
  selector: 'app-autor',
  templateUrl: './autor.component.html',
  styleUrls: ['./autor.component.css']
})
export class AutorComponent implements OnInit {
  @ViewChild('form_autor') form_autor?: NgForm;
datos: any=[];
filterPost='';

  constructor(private serv: AutorService,private serv2: AutoresService,private router:Router) { 
  
  }
  ngOnInit(): void { 
    this.serv.list().subscribe(data => { console.info(data);
  this.datos=data._embedded.autors;
  })
  }
  Enviar(){

    this.serv.grabar(this.form_autor?.value).subscribe(data=> console.log(data) );
     }
     Eliminar(element: any) {
      Swal.fire({
        title: "Seguro de Eliminar Datos del Autor",
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
  public eliminar(autor:string){
    this.serv.borrar(autor).subscribe(data => this.ngOnInit());

  }



  Habilitar(element: any) {
    Swal.fire({
      title: "Seguro de Habilitar al Autor",
      text: "¿Habilitar?",
      icon: "success",
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
      
    })
      
    .then(resultado => {
      if (resultado.value) {
            if (element.estado == 1) {
            element.estado = 0;
            return resultado.value;
          } else
            element.estado = 1;
         return resultado.value;
          console.log(resultado.value);
      } else {
        console.log("Cancelado");
      }
    });
  }

  
pdf(element: any){
  var usu = new jsPDF('p', 'mm', 'letter');
  usu.setFont('times');
  usu.setFontSize(18);
  usu.setTextColor('blue');
  usu.text("Datos del Autor", 80, 20);
  usu.setFontSize(12);
  usu.line(15, 25, 200, 25); usu.line(15, 25, 15, 80);
  usu.line(200, 25, 200, 80); usu.line(15, 80, 200, 80);

  usu.text("Nombres: ", 20, 30);
  usu.text("Genero: ", 20, 40);
  usu.setTextColor('black');
  usu.text(element.ap, 40, 30);
  usu.text(element.am, 55, 30);
  usu.text(element.nombre, 70, 30);
  usu.text(element.genero, 40, 40);
  usu.save("Autor");
}


editar(data:any){
  this.serv2.set(data);
  this.router.navigate(['/add_autor'])

}
}
