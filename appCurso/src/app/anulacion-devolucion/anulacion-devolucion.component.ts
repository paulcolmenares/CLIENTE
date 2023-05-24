import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { DatosService } from '../servicios/datos.service';
import { EjemplarService } from '../servicios/ejemplar.service';
import { MdevolService } from '../servicios/mdevol.service';
import { PresEjemplarService } from '../servicios/pres-ejemplar.service';

@Component({
  selector: 'app-anulacion-devolucion',
  templateUrl: './anulacion-devolucion.component.html',
  styleUrls: ['./anulacion-devolucion.component.css']
})
export class AnulacionDevolucionComponent implements OnInit {
  lista: any=[];

  per: any=[];
  ejem: any=[];
  ddvol= new FormGroup({
    dvol: new FormControl ('',[]),
    ejem: new FormControl('', [])
  })
  constructor(private serv: MdevolService, private serv1 : DatosService,
     private serv2: EjemplarService ) { }

  ngOnInit(): void {
     this.serv.list().subscribe(data =>{ this.lista=data._embedded.mDevols;})
    this.serv1.list().subscribe(data =>{ this.per=data._embedded.datoes;})
    this.serv2.list().subscribe(data =>{ this.ejem=data._embedded.ejemplars;})
  
   
  }
  getID(x:string):string {
    return x.substr(x.lastIndexOf("/")+1,x.length);
  }
  Eliminar(element: any) {
    Swal.fire({
      title: "Seguro de Eliminar Datos de la Devolucion",
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
  Eliminar1(element: any) {
    Swal.fire({
      title: "Seguro de Eliminar Datos del Ejemplar",
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
  Eliminaremos(){
    console.log(this.ddvol.value);
this.serv.eliminar(this.ddvol.value).subscribe();
  }
  delete() {
    Swal.fire({
      title: "Seguro de Anular la Devolucion",
      text: "¿Eliminar?",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: "Aceptar",
      cancelButtonText: "Cancelar",
    })
      .then(resultado => {
        if (resultado.value) {
          this.Eliminaremos(),
            console.log('Borrado');
        } else {
          console.log("Cancelado");
        }
      });
  }
}
