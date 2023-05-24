import { Component, OnInit } from '@angular/core';
import { EmpleadoService } from '../servicios/empleado.service';

@Component({
  selector: 'app-empleados',
  templateUrl: './empleados.component.html',
  styleUrls: ['./empleados.component.css']
})
export class EmpleadosComponent implements OnInit {

  datos: any=[];

  constructor(private serv:EmpleadoService) { }

  ngOnInit(): void {
    
    this.serv.list().subscribe(data => { console.info(data);
      this.datos=data._embedded.empleadoses;
      })
  }

}
