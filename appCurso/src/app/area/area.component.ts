import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';

import { AreaService } from '../servicios/area.service';
import { AreasService } from '../servicios/areas.service';

@Component({
  selector: 'app-area',
  templateUrl: './area.component.html',
  styleUrls: ['./area.component.css']
})
export class AreaComponent implements OnInit {
datos: any=[];
filterPost='';
@ViewChild('form_area') form_are?: NgForm;

  constructor(private serv:AreaService,private router:Router,
    private serv2: AreasService) { }


  ngOnInit(): void {
    this.serv.list().subscribe(data => { console.info(data);
      this.datos=data._embedded.areas;
      })
  }
  Eliminar(element: any) {
    Swal.fire({
      title: "Seguro de Eliminar Datos del Area",
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
  Habilitar(element: any) {
    Swal.fire({
      title: "Seguro de Habilitar el Area",
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
      this.router.navigate(['/add_area'])
    
  }
}
