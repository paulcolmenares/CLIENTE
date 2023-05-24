import { Component, OnInit } from '@angular/core';
import Swal from 'sweetalert2';
import { UserService } from '../servicios/user.service';

@Component({
  selector: 'app-asigusu',
  templateUrl: './asigusu.component.html',
  styleUrls: ['./asigusu.component.css']
})
export class AsigusuComponent implements OnInit {
  datos: any=[];
  constructor(private serv: UserService) { }

  ngOnInit(): void {
    this.serv.list().subscribe(data => { console.info(data);
      this.datos=data._embedded.usuarios;
      })
  }
  Eliminar(element: any) {
    Swal.fire({
      title: "Seguro de Eliminar Datos del Usuario",
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
