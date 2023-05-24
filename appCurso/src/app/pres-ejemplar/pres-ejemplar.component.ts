import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import jsPDF from 'jspdf';
import Swal from 'sweetalert2';
import { DatosService } from '../servicios/datos.service';
import { EjemplarService } from '../servicios/ejemplar.service';
import { PresEjemplarService } from '../servicios/pres-ejemplar.service';
import { TextoService } from '../servicios/texto.service';

@Component({
  selector: 'app-pres-ejemplar',
  templateUrl: './pres-ejemplar.component.html',
  styleUrls: ['./pres-ejemplar.component.css']
})
export class PresEjemplarComponent implements OnInit {
  datos: any=[];
  per: any=[];
  
  dprestamo = new FormGroup({
    pres: new FormControl ('',[]),
    ejem: new FormControl('', [])
  })
  lista: any=[];
  listas: any=[];
  constructor(private serv:PresEjemplarService ,
    private serv1 : DatosService, private serv4: EjemplarService, private serv5: PresEjemplarService) { }

  ngOnInit(): void {
    this.serv.list().subscribe(data => {
      this.datos=data._embedded.mPrestamoes;
      })
      this.serv1.list().subscribe(data =>{ this.per=data._embedded.datoes;})     
      this.serv4.list().subscribe(data =>{ this.listas=data._embedded.ejemplars;})
    this.serv5.list().subscribe(data => this.lista=data._embedded.mPrestamoes);
     
  }
  Eliminar(element: any) {
    Swal.fire({
      title: "Seguro de Eliminar Datos de Prestamo Ejemplar",
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
  pdf(){ 
    var doc = new jsPDF()

doc.text( 'This is the default font.',20, 20);

doc.setFont('courier')
doc.text('This is courier normal.',20, 30);

doc.setFont('times');
doc.text('This is times italic.',20, 40 );
doc.save("Prestamo");
  }
  getID(x:string):string {
    return x.substr(x.lastIndexOf("/")+1,x.length);
  }
  Agregar(){
    console.log(this.dprestamo.value);
    this.serv4.grabaremos(this.dprestamo.value).subscribe();
    this.confirmacion();
      }
  Eliminaron(){
        console.log(this.dprestamo.value);
    this.serv4.eliminar(this.dprestamo.value).subscribe();
    this.confirmacion1();
      }  
      confirmacion() {
        Swal.fire({
          title: "Se guardo corectamente",
          icon: 'success',
        });
      }confirmacion1() {
        Swal.fire({
          title: "Se elimino corectamente",
          icon: 'success',
        });
      }
}
