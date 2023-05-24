import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Swal from 'sweetalert2';
import { AutorService } from '../servicios/autor.service';
import { TextoService } from '../servicios/texto.service';
import { TipoService } from '../servicios/tipo.service';

@Component({
  selector: 'app-escriben',
  templateUrl: './escriben.component.html',
  styleUrls: ['./escriben.component.css']
})
export class EscribenComponent implements OnInit {
  lista: any=[];
  listas: any=[];

  tipo: any=[];
  escriben = new FormGroup({
    aut: new FormControl ('',[]),
    te: new FormControl('', [])
  })

  tipoText = new FormGroup({
    tipo: new FormControl ('',[]),
    te: new FormControl('', [])
  })
  constructor( private serv : TextoService, private serv1: AutorService, private serv2: TipoService ) { }

  ngOnInit(): void {
    this.serv1.list().subscribe(data => this.lista=data._embedded.autors);
    this.serv.list().subscribe(data => this.listas=data._embedded.textoes);
    this.serv2.list().subscribe(data => this.tipo=data._embedded.tipoes);
  }
  Agregar(){
    console.log(this.escriben.value);
    this.serv.grabaremos(this.escriben.value).subscribe();
    this.confirmacion();
      }
      Agregar1(){
        console.log(this.tipoText.value);
        this.serv.grabaremos1(this.tipoText.value).subscribe();
        this.confirmacion();
          }
      Eliminar(){
        console.log(this.escriben.value);
    this.serv.eliminar(this.escriben.value).subscribe();
    this.confirmacion1();
      }
      Eliminar1(){
        console.log(this.tipoText.value);
    this.serv.eliminar1(this.tipoText.value).subscribe();
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
