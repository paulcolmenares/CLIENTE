import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import jsPDF from 'jspdf';

import { TelefonoService } from '../servicios/telefono.service';
import { UsuarioService } from '../servicios/usuario.service';
import { UsuariosService } from '../servicios/usuarios.service';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styleUrls: ['./usuario.component.css']
})
export class UsuarioComponent implements OnInit {
  @ViewChild('form_usuario') form_usu?: NgForm;
  //foto
  imageError: string = "";
  isImageSaved: boolean = false;
  cardImageBase64: string = " ";
  imgBase64Path: string = "";


  est_edit: any = [];
  telef: any = [];
  usuarios: any = [];
  filterPost='';
  constructor(private router: Router, private modal: NgbModal,
    private usuario_serv: UsuarioService,
    private datos: UsuariosService, private serv2: TelefonoService) {

  }
  Eliminar(element: any) {
    Swal.fire({
      title: "Seguro de Eliminar Datos de la Persona",
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

  public eliminar(editorial: string) {
    this.usuario_serv.borrar(editorial).subscribe(data => this.ngOnInit());

  }

  Habilitar(element: any) {
    Swal.fire({
      title: "Seguro de Habilitar a la Persona",
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
          console.log(element.estado);
      } else {
        console.log("Cancelado");
      }
    });
  }
  public guardar(editorial: string){
      this.usuario_serv.grabar(editorial).subscribe(data => this.ngOnInit());
  
    
  }
  ngOnInit(): void {
    this.usuario_serv.list().subscribe(data => {
      this.usuarios = data._embedded.personae;
    })
  }

  pdf2(element: any) {
    var usu = new jsPDF('p', 'mm', 'letter');
    var imgData = 'data:image/jpeg;base64,' + element.foto;
    usu.setFont('times');
    usu.setFontSize(18);
    usu.setTextColor('blue');
    usu.text("Datos del Usuario", 80, 20);
    usu.setFontSize(12);
    usu.line(15, 25, 200, 25); usu.line(15, 25, 15, 80);
    usu.line(200, 25, 200, 80); usu.line(15, 80, 200, 80);

    usu.text("Nombres: ", 20, 30);
    usu.text("Genero: ", 20, 40);
    usu.text("Estado: ", 20, 50);
    usu.text("Tipo persona: ", 20, 60);

    usu.setTextColor('black');
    usu.text("Foto", 165, 30);
    usu.text(element.ap, 40, 30);
    usu.text(element.am, 55, 30);
    usu.text(element.nombre, 70, 30);
    usu.text(element.genero, 40, 40);
    usu.text(element.tipoper, 50, 60);
    // usu.text(element.estado, 190,10) 
    usu.addImage(imgData, 'JPEG', 150, 35, 40, 0)
    usu.save("Usuario");
  }

  fileChangeEvent(fileInput: any) {
    this.imageError = "";
    console.log(fileInput);
    if (fileInput.target.files && fileInput.target.files[0]) {
      // Size Filter Bytes
      const max_size = 20971520;
      const allowed_types = ['image/png', 'image/jpeg'];
      const max_height = 15200;
      const max_width = 25600;

      if (fileInput.target.files[0].size > max_size) {
        this.imageError =
          'Maximum size allowed is ' + max_size / 1000 + 'Mb';
        console.log(this.imageError);
        return false;
      }

      if (!allowed_types.includes(fileInput.target.files[0].type)) {
        this.imageError = 'Only Images are allowed ( JPG | PNG )';
        console.log(this.imageError);
        return false;
      }
      const reader = new FileReader();
      reader.onload = (e: any) => {
        const image = new Image();
        image.src = e.target.result;
        image.onload = rs => {

          this.cardImageBase64 = e.target.result;
          this.imgBase64Path = e.target.result.substr(23, e.target.result.length);
          console.log(this.imgBase64Path);
          this.isImageSaved = true;
          return true;
        }
      };

      reader.readAsDataURL(fileInput.target.files[0]);
      console.log(reader);
      return true;
    }
    else return false;
  }

  removeImage() {
    this.cardImageBase64 = "";
    this.isImageSaved = false;
  }
  Guardar() {
    Swal.fire({
      title: "Se Guardo Correctamente",
      icon: "success",
      confirmButtonText: "Aceptar",
    });
  }
  Editar(data: any) {
    this.datos.set(data);
    this.router.navigate(['/add_usuario'])
  }
}
