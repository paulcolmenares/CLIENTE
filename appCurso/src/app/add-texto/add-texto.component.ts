import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import jsPDF from 'jspdf';
import Swal from 'sweetalert2';
import { AreaService } from '../servicios/area.service';
import { AutorService } from '../servicios/autor.service';
import { EditorialService } from '../servicios/editorial.service';
import { TextoService } from '../servicios/texto.service';
import { TextosService } from '../servicios/textos.service';
import { TipoService } from '../servicios/tipo.service';

@Component({
  selector: 'app-add-texto',
  templateUrl: './add-texto.component.html',
  styleUrls: ['./add-texto.component.css']
})
export class AddTextoComponent implements OnInit {
  text:any;
   @ViewChild('form_texto') form_tex?: NgForm;

   area:any=[];

   text_area:any=[];
   texto: number=0;
   areas: number=0;

   edi: any=[];
are: any=[];
tip: any=[];
aut: any=[];
  constructor(private serv: TextoService, private serv1: AreaService, private serv2: EditorialService,
    private serv3: TipoService, private serv4: AutorService, private datos: TextosService,
    private router: Router) {

     }

  ngOnInit(): void {
    this.serv1.list().subscribe(data =>{ console.info(data); this.are=data._embedded.areas;})
    this.serv2.list().subscribe(data =>{ 
      console.info(data); this.edi=data._embedded.editorials;})
      this.text=this.datos.get();

      
  }

  
  Enviar(){
    this.serv.grabar(this.form_tex?.value).subscribe(data=> console.log(data));
    this.router.navigate(['/list_texto'])
    this.confirmacion();   
   }
      confirmacion() {
       Swal.fire({
         title: "Se guardo corectamente",
         icon: 'success',
       });
     }
 
  pdf(){
    var doc=new jsPDF();
  }
  getID(x:string):string {
    return x.substr(x.lastIndexOf("/")+1,x.length);
  }
}
