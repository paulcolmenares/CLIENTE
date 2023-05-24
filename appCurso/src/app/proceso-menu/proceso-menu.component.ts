import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { MenusService } from '../servicios/menus.service';
import { ProcesoService } from '../servicios/proceso.service';

@Component({
  selector: 'app-proceso-menu',
  templateUrl: './proceso-menu.component.html',
  styleUrls: ['./proceso-menu.component.css']
})
export class ProcesoMenuComponent implements OnInit {
  lista: any=[];
  listas: any=[];

  menu_pro= new FormGroup({
    menu: new FormControl ('',[]),
    pro: new FormControl('', [])
  })
  constructor(private serv: MenusService, private serv1 : ProcesoService) { }

  ngOnInit(): void {
    this.serv.list().subscribe(data => this.lista=data._embedded.menus);
    this.serv1.list().subscribe(data => this.listas=data._embedded.procesoes);
  }
  Agregar(){
    console.log(this.menu_pro.value);
    this.serv1.grabaremos(this.menu_pro.value).subscribe();
   
      this.confirmacion();   
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
      Eliminar(){
        console.log(this.menu_pro.value);
    this.serv1.eliminar(this.menu_pro.value).subscribe();
    this.confirmacion1();   
      }
      
}
