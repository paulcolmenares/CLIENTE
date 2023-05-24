import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MenuesService } from '../servicios/menues.service';
import { MenusService } from '../servicios/menus.service';

@Component({
  selector: 'app-menus',
  templateUrl: './menus.component.html',
  styleUrls: ['./menus.component.css']
})
export class MenusComponent implements OnInit {
  lista: any=[];
  filterPost='';
  constructor(private serv: MenusService,private router:Router,
    private datos: MenuesService ) { }

  ngOnInit(): void {
    this.serv.list().subscribe(data => this.lista=data._embedded.menus);
  }
  Eliminar(element: any) {
    Swal.fire({
      title: "Seguro de Eliminar Datos del Menu",
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
      title: "Seguro de Habilitar el Menu",
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
    this.router.navigate(['/add_menu'])
  
}

}
