import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { EjemplarService } from '../servicios/ejemplar.service';
import { MdevolService } from '../servicios/mdevol.service';

@Component({
  selector: 'app-ddevol',
  templateUrl: './ddevol.component.html',
  styleUrls: ['./ddevol.component.css']
})
export class DdevolComponent implements OnInit {
  datos: any=[];
  lista: any=[];
  listas: any=[];
 ddvol= new FormGroup({
    dvol: new FormControl ('',[]),
    ejem: new FormControl('', [])
  })
  constructor( private serv : MdevolService, private serv1 : EjemplarService) { }

  ngOnInit(): void {
    this.serv.list().subscribe(data => { console.info(data);
      this.datos=data._embedded.mDevols;
      })
      this.serv1.list().subscribe(data => { console.info(data);
        this.listas=data._embedded.ejemplars;
        })
  }
 
  Agregar(){
    console.log(this.ddvol.value);
    this.serv.grabaremos(this.ddvol.value).subscribe();
   this.confirmacion();
      }
      confirmacion() {
        Swal.fire({
          title: "Se guardo corectamente",
          icon: 'success',
        });
      }
      Eliminaremos(){
        console.log(this.ddvol.value);
    this.serv.eliminar(this.ddvol.value).subscribe();
     this.confirmacion1();
      }
    
      confirmacion1() {
        Swal.fire({
          title: "Se elimino corectamente",
          icon: 'success',
        });
      }

}
