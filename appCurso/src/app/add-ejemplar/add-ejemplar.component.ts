import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EjemplarService } from '../servicios/ejemplar.service';
import { EjemplaresService } from '../servicios/ejemplares.service';
import { TextoService } from '../servicios/texto.service';

@Component({
  selector: 'app-add-ejemplar',
  templateUrl: './add-ejemplar.component.html',
  styleUrls: ['./add-ejemplar.component.css']
})
export class AddEjemplarComponent implements OnInit {
  ejem:any; 
  text:any=[];
  @ViewChild('form_ejem') form_ejemplr?: NgForm;

  constructor(private serv: EjemplarService,private serv2: EjemplaresService,
    private router: Router, private serv3: TextoService) { }
  
  ngOnInit(): void {
    this.ejem=this.serv2.get();
    this.serv3.list().subscribe(data =>{ console.info(data); 
      this.text=data._embedded.textoes;})
  }

  Enviar(){
    this.serv.grabar(this.form_ejemplr?.value).subscribe(data=> console.log(data) );   

    this.router.navigate(['/list_ejemplar'])
    this.confirmacion();   
   }
      confirmacion() {
       Swal.fire({
         title: "Se guardo corectamente",
         icon: 'success',
       });
     }
}