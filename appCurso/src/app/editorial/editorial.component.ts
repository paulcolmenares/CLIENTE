import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { EditorialService } from '../servicios/editorial.service';
import { EditorialesService } from '../servicios/editoriales.service';
import { TextoService } from '../servicios/texto.service';

@Component({
  selector: 'app-editorial',
  templateUrl: './editorial.component.html',
  styleUrls: ['./editorial.component.css']
})
export class EditorialComponent implements OnInit {
  @ViewChild('form_editorial') form_edit?: NgForm;
  datos: any = [];
  filterPost='';

  textos: any = [];
  constructor(private serv: EditorialService, private serv2: TextoService,
    private modal: NgbModal, private router:Router,private serv3: EditorialesService) { }

  ngOnInit(): void {
    this.serv.list().subscribe(data => {
      this.datos = data._embedded.editorials;
    })
  }
 Enviar() {
    this.serv.grabar(this.form_edit?.value).subscribe(data => console.log(data));
  }
  public obtenerTexto(enlace: string) {

    this.serv2.texto_edit(enlace).subscribe(dat => this.textos = dat._embedded.textoes);
    console.log(enlace);
  }

  public eliminar(editorial: string) {
    this.serv.borrar(editorial).subscribe(data => this.ngOnInit());

  }
  Eliminar(element: any) {
    Swal.fire({
      title: "Seguro de Eliminar Datos de la Editorial",
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
  editar(data:any){
    this.serv3.set(data);
    this.router.navigate(['/add_editorial'])
  
}
Habilitar(element: any) {
  Swal.fire({
    title: "Seguro de Habilitar la Editorial",
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
}
