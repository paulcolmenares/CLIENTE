import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { TipoService } from '../servicios/tipo.service';
import { TiposService } from '../servicios/tipos.service';

@Component({
  selector: 'app-add-tipo',
  templateUrl: './add-tipo.component.html',
  styleUrls: ['./add-tipo.component.css']
})
export class AddTipoComponent implements OnInit {
  tipo:any;
  @ViewChild('form_tip') form_tipo?: NgForm;

  constructor(private serv: TipoService, private serv2: TiposService,
    private router: Router) { }

  ngOnInit(): void {
    this.tipo=this.serv2.get();
  }
  Enviar(){
    this.serv.grabar(this.form_tipo?.value).subscribe();
    console.log(this.form_tipo?.value);
    this.router.navigate(['/list_tipo'])
    this.confirmacion();   
  }
     confirmacion() {
      Swal.fire({
        title: "Se guardo corectamente",
        icon: 'success',
      });
    }

}
