import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { RolService } from '../servicios/rol.service';
import { UserService } from '../servicios/user.service';

@Component({
  selector: 'app-rol-usuario',
  templateUrl: './rol-usuario.component.html',
  styleUrls: ['./rol-usuario.component.css']
})
export class RolUsuarioComponent implements OnInit {
  lista: any=[];
  listas: any=[];

  rol_usu = new FormGroup({
    usu: new FormControl ('',[]),
    rol: new FormControl('', [])
  })
  constructor(private serv : UserService, private serv1 : RolService) { }

  ngOnInit(): void {
    this.serv.list().subscribe(data => this.lista=data._embedded.usuarios);
    this.serv1.list().subscribe(data => this.listas=data._embedded.rols);
  }
  Agregar(){
console.log(this.rol_usu.value);
this.serv.grabaremos(this.rol_usu.value).subscribe();
this.confirmacion();
  }
  Eliminar(){
    console.log(this.rol_usu.value);
this.serv.eliminar(this.rol_usu.value).subscribe();
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
