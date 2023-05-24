import { Component, OnInit } from '@angular/core';
import { RolService } from '../servicios/rol.service';

@Component({
  selector: 'app-cabecera',
  templateUrl: './cabecera.component.html',
  styleUrls: ['./cabecera.component.css']
})
export class CabeceraComponent implements OnInit {
  hoy :any= new Date();
rol: any=[];
  constructor(private serv : RolService) { }

  ngOnInit(): void {
    this.serv.list().subscribe(data =>{ 
      console.info(data); this.rol=data._embedded.rols;})
  }

}
