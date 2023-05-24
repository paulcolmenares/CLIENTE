import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import jsPDF from 'jspdf';
import Swal from 'sweetalert2';
import { AreaService } from '../servicios/area.service';
import { EditorialService } from '../servicios/editorial.service';
import { TextoService } from '../servicios/texto.service';
import { TextosService } from '../servicios/textos.service';
import { TipoService } from '../servicios/tipo.service';

@Component({
  selector: 'app-texto',
  templateUrl: './texto.component.html',
  styleUrls: ['./texto.component.css']
})
export class TextoComponent implements OnInit {
  @ViewChild('form_texto') form_tex?: NgForm;
datos: any=[];
edi: any=[];
are: any=[];
tip: any=[];
texto: number=0;

grupos_doc: any=[];
area: number=0;

  constructor(private serv: TextoService, private router:Router,
    private serv2: EditorialService, private serv3: AreaService,private serv4: TipoService,private serv5 : TextosService) { }

  ngOnInit(): void { 
    this.serv.list().subscribe(data => { console.info(data); this.datos=data._embedded.textoes;})
    this.serv2.list().subscribe(data =>{ console.info(data); this.edi=data._embedded.editorials;})
    this.serv3.list().subscribe(data =>{ this.are=data._embedded.areas;})
  this.serv4.list().subscribe(data => this.tip=data._embedded.tipoes);
  }
  Eliminar(element: any) {
    Swal.fire({
      title: "Seguro de Eliminar Datos del Texto",
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
      title: "Seguro de Habilitar el Texto",
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
//obtener editorial
  public obtenerEditorial(enlace:string){
     this.serv2.edi_tex(enlace).subscribe(data => this.edi=data._embedded.editorials);
       console.log(enlace);
  }
 
  pdf(){
   
    var usu = new jsPDF('p', 'mm', 'letter');
    var cont=2;
    usu.setFont('times');
    usu.setFontSize(18);
    usu.setTextColor('blue');
    usu.text("Datos del Texto", 80, 20);
    usu.setFontSize(12);
    usu.line(15, 25, 200, 25); usu.line(15, 25, 15, 80);
    usu.line(200, 25, 200, 80); usu.line(15, 80, 200, 80);
    usu.text("Titulo: ", 20, 30);
    this.datos.forEach((element:
      {
        titulo:string | string[]  ;}) => {
        cont++;
         usu.text(element.titulo,40,10*cont);   
    }); 
  
    usu.save("Textos");
  }
  //mostrar editorial
  getID(x:string):string {
    return x.substr(x.lastIndexOf("/")+1,x.length);
  }
  Enviar(){
    this.serv.grabar(this.form_tex?.value).subscribe(data=> console.log(data));
     }
     editar(data:any){
      this.serv5.set(data);
      this.router.navigate(['/add_texto'])
    
  }
}
