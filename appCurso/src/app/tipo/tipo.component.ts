import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { TipoService } from '../servicios/tipo.service';
import { TiposService } from '../servicios/tipos.service';

@Component({
  selector: 'app-tipo',
  templateUrl: './tipo.component.html',
  styleUrls: ['./tipo.component.css']
})
export class TipoComponent implements OnInit {
  @ViewChild('form_tips') form_tip?: NgForm;
  datos: any=[];
  filterPost='';
  constructor(private serv: TipoService,private modal: NgbModal,
    private serv2 : TiposService,private router:Router) { 
   

  }

  ngOnInit(): void {
    this.serv.list().subscribe(data => { 
      this.datos=data._embedded.tipoes;
      })
  }
  Eliminar(element: any) {
    Swal.fire({
      title: "Seguro de Eliminar Datos del Tipo",
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
  public eliminar(editorial:string){
    this.serv.borrar(editorial).subscribe(data => this.ngOnInit());

  }
  Habilitar(element: any) {
    Swal.fire({
      title: "Seguro de Habilitar el Tipo",
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
  editar(data:any){
    this.serv2.set(data);
    this.router.navigate(['/add_tipo'])
  
}
  Enviar(){

    this.serv.grabar(this.form_tip?.value).subscribe(data=> console.log(data) );
     }
}
