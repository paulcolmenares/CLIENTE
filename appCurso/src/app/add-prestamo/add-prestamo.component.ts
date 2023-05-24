import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { DatosService } from '../servicios/datos.service';
import { EjemplarService } from '../servicios/ejemplar.service';
import { PresEjemplarService } from '../servicios/pres-ejemplar.service';
import { UsuarioService } from '../servicios/usuario.service';

@Component({
  selector: 'app-add-prestamo',
  templateUrl: './add-prestamo.component.html',
  styleUrls: ['./add-prestamo.component.css']
})
export class AddPrestamoComponent implements OnInit {
  per: any=[];
  dprestamo = new FormGroup({
    pres: new FormControl ('',[]),
    ejem: new FormControl('', [])
  })
  lista: any=[];
  listas: any=[];
  @ViewChild('form_pres') form_prestamo?: NgForm;
  
  constructor( private serv : PresEjemplarService,private serv1 : DatosService,
    private router: Router, private serv2: EjemplarService, private serv3 : PresEjemplarService) { }

  ngOnInit(): void {
    this.serv1.list().subscribe(data =>{ this.per=data._embedded.datoes;})
    this.serv2.list().subscribe(data =>{ this.listas=data._embedded.ejemplars;})
    this.serv3.list().subscribe(data => this.lista=data._embedded.mPrestamoes);
  }
  getID(x:string):string {
    return x.substr(x.lastIndexOf("/")+1,x.length);
  }
  Enviar(){
    this.serv.grabar(this.form_prestamo?.value).subscribe(data=> console.log(data));
    this.router.navigate(['/list_prestamo-ejemplar'])
    this.confirmacion();   
   }
      confirmacion() {
       Swal.fire({
         title: "Se guardo corectamente",
         icon: 'success',
       });
     }
     Agregar(){
      console.log(this.dprestamo.value);
      this.serv2.grabaremos(this.dprestamo.value).subscribe();
        }
        Eliminar(){
          console.log(this.dprestamo.value);
      this.serv2.eliminar(this.dprestamo.value).subscribe();
        }
}
