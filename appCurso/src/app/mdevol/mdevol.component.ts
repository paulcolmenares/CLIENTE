import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { MdevolService } from '../servicios/mdevol.service';
import { PresEjemplarService } from '../servicios/pres-ejemplar.service';
import { UserService } from '../servicios/user.service';

@Component({
  selector: 'app-mdevol',
  templateUrl: './mdevol.component.html',
  styleUrls: ['./mdevol.component.css']
})
export class MdevolComponent implements OnInit {
  @ViewChild('form_devol') form_dev?: NgForm;
  rol:any;
  mv: any=[];
  usu: any=[];
  lista: any=[];
  constructor(private serv1 : PresEjemplarService , 
    private serv2 : MdevolService,
    private router:Router, private serv3: UserService) { }

  ngOnInit(): void {
    this.serv1.list().subscribe(data =>{ console.info(data); this.mv=data._embedded.mPrestamoes;})
    this.serv3.list().subscribe(data =>{ console.info(data); this.usu=data._embedded.usuarios;})
    this.serv1.list().subscribe(data => this.lista=data._embedded.mPrestamoes);
  }
  Enviar(){
   this.serv2.grabar(this.form_dev?.value).subscribe();
    console.log(this.form_dev?.value);
    this.router.navigate(['/list_devol'])
    this.confirmacion();   
   }
      confirmacion() {
       Swal.fire({
         title: "Se guardo corectamente",
         icon: 'success',
       });
     }
}
