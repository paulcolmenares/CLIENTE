import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import Swal from 'sweetalert2';
import { DatosService } from '../servicios/datos.service';
import { UserService } from '../servicios/user.service';
import { UsuarioService } from '../servicios/usuario.service';
import { UsuariosService } from '../servicios/usuarios.service';

@Component({
  selector: 'app-asignar',
  templateUrl: './asignar.component.html',
  styleUrls: ['./asignar.component.css']
})
export class AsignarComponent implements OnInit {
  
  @ViewChild('form_user') form_ususer?: NgForm;
  @ViewChild('form_usuario') form_usu?: NgForm;
  @ViewChild('form_dato') form_dat?: NgForm;
  per: any=[];

  //foto
  imageError: string="";
  isImageSaved: boolean = false;
  cardImageBase64: string= " ";
  imgBase64Path: string="";
 usu: any;
  constructor(private serv1: UserService, private serv : UsuarioService,
    private datos : UsuariosService,private serv2 : DatosService) { }

  ngOnInit(): void {
  //persona
  this.usu=this.datos.get();
  if (this.usu.foto) { console.log("Hay foto");
  this.isImageSaved=true;
 this.cardImageBase64="data:image/jpeg;base64,"+this.usu.foto; 
}

    //usuario
    this.serv.list().subscribe(data => { console.info(data);
      this.per=data._embedded.personae;
      })
  }

  Enviar(){
    this.serv1.grabar(this.form_ususer?.value).
    subscribe(data=> console.log(data) );
    this.confirmacion();
     }
 Enviar1(){
      this.serv2.grabar(this.form_dat?.value).
      subscribe(data=> console.log(data) );
      this.confirmacion();

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
                  this.imgBase64Path = e.target.result.substr(23,e.target.result.length);
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
  
removeImage(){
  this.cardImageBase64="";
  this.isImageSaved=false;

}
getID(x:string):string {
  return x.substr(x.lastIndexOf("/")+1,x.length);
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
