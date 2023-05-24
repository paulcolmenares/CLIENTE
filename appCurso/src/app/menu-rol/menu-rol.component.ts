import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { MenusService } from '../servicios/menus.service';
import { RolService } from '../servicios/rol.service';

@Component({
  selector: 'app-menu-rol',
  templateUrl: './menu-rol.component.html',
  styleUrls: ['./menu-rol.component.css']
})
export class MenuRolComponent implements OnInit {
  lista: any=[];
  listas: any=[];

  menu_rol= new FormGroup({
    rol: new FormControl ('',[]),
    menu: new FormControl('', [])
  })
  constructor( private serv : RolService,private serv1 : MenusService) { }

   ngOnInit(): void {
    this.serv.list().subscribe(data => this.lista=data._embedded.rols);
    this.serv1.list().subscribe(data => this.listas=data._embedded.menus);
  }
  Agregar(){
    console.log(this.menu_rol.value);
    this.serv.grabaremos(this.menu_rol.value).subscribe();
    this.confirmacion();
      }
      Eliminar(){
        console.log(this.menu_rol.value);
    this.serv.eliminar(this.menu_rol.value).subscribe();
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
