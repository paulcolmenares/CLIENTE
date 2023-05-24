import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { AreaService } from '../servicios/area.service';
import { EditorialService } from '../servicios/editorial.service';
import { EjemplarService } from '../servicios/ejemplar.service';
import { EjemplaresService } from '../servicios/ejemplares.service';
import { TextoService } from '../servicios/texto.service';
import { TipoService } from '../servicios/tipo.service';

@Component({
  selector: 'app-ejemplar',
  templateUrl: './ejemplar.component.html',
  styleUrls: ['./ejemplar.component.css']
})
export class EjemplarComponent implements OnInit {
  datos: any=[];
  text: any=[];
  edi: any=[];
  are: any=[];
  tip: any=[];
  filterPost='';
  constructor(private serv:EjemplarService,private serv1: EditorialService,
     private serv2: AreaService, private serv3: TipoService, private router:Router ,
      private serv4: EjemplaresService,private serv5 : TextoService) { }

  ngOnInit(): void {
    this.serv.list().subscribe(data => { console.info(data);
      this.datos=data._embedded.ejemplars;
      })
      this.serv1.list().subscribe(data =>{ console.info(data); this.edi=data._embedded.editorials;})
      this.serv2.list().subscribe(data =>{ console.info(data); this.are=data._embedded.areas;})
      this.serv3.list().subscribe(data => this.tip=data._embedded.tipoes);
      this.serv5.list().subscribe(data =>{ console.info(data); this.text=data._embedded.textoes;})
    }
    Eliminar(element: any) {
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
    Habilitar(element: any) {
      Swal.fire({
        title: "Seguro de Habilitar el Ejemplar",
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
  getID(x:string):string {
    return x.substr(x.lastIndexOf("/")+1,x.length);
  }
  editar(data:any){
    this.serv4.set(data);
    this.router.navigate(['/add_ejemplar'])
  
}

}
