import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { DatosService } from '../servicios/datos.service';

@Component({
  selector: 'app-ci',
  templateUrl: './ci.component.html',
  styleUrls: ['./ci.component.css']
})
export class CiComponent implements OnInit {
  datos: any=[];
  constructor(private serv: DatosService) { }

  ngOnInit(): void {
    this.serv.list().subscribe(data => { console.info(data);
      this.datos=data._embedded.datoes;
      })
  }
  Eliminar(element: any) {
    Swal.fire({
      title: "Seguro de Eliminar Datos del Ci",
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
