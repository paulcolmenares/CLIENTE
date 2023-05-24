import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { DatosService } from '../servicios/datos.service';
import { EjemplarService } from '../servicios/ejemplar.service';
import { MdevolService } from '../servicios/mdevol.service';
import { PresEjemplarService } from '../servicios/pres-ejemplar.service';

@Component({
  selector: 'app-devolucion',
  templateUrl: './devolucion.component.html',
  styleUrls: ['./devolucion.component.css']
})
export class DevolucionComponent implements OnInit {
  ejemp: any=[];
  per: any=[];
  lista: any=[];

  constructor( private serv1 : DatosService,
    private serv2 : EjemplarService, 
    private serv3: MdevolService ) { }

  ngOnInit(): void {
    this.serv2.list().subscribe(data =>{ this.ejemp=data._embedded.ejemplars;})
    this.serv1.list().subscribe(data =>{ this.per=data._embedded.datoes;})
    this.serv3.list().subscribe(data => this.lista=data._embedded.mDevols);
  }
  getID(x:string):string {
    return x.substr(x.lastIndexOf("/")+1,x.length);
  }
  Eliminar(element: any) {
    Swal.fire({
      title: "Seguro de Eliminar la Devolucion",
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
  this.serv3.borrar(autor).subscribe(data => this.ngOnInit());

}
}
