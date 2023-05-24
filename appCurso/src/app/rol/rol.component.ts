import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { RolService } from '../servicios/rol.service';
import { RolesService } from '../servicios/roles.service';

@Component({
  selector: 'app-rol',
  templateUrl: './rol.component.html',
  styleUrls: ['./rol.component.css']
})
export class RolComponent implements OnInit {
  lista: any=[];
  filterPost='';
  constructor( private serv: RolService,
    private router:Router,private datos: RolesService) { }

 
  ngOnInit(): void {
    this.serv.list().subscribe(data => this.lista=data._embedded.rols);
  }
 
  Eliminar(element: any) {
    Swal.fire({
      title: "Seguro de Eliminar Datos del Rol",
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
      title: "Seguro de Habilitar el Rol",
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
    this.datos.set(data);
    this.router.navigate(['/add_rol'])
  
}
}
