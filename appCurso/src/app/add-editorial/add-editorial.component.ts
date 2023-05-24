import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { EditorialService } from '../servicios/editorial.service';
import { EditorialesService } from '../servicios/editoriales.service';

@Component({
  selector: 'app-add-editorial',
  templateUrl: './add-editorial.component.html',
  styleUrls: ['./add-editorial.component.css']
})
export class AddEditorialComponent implements OnInit {
  datos: any=[];
  edit: any;
  @ViewChild('form_editorial') form_edit?: NgForm;

  constructor(private editorial_serv: EditorialService, private serv2: EditorialesService,
    private router: Router) { }

  ngOnInit(): void {
    this.edit=this.serv2.get();
  }
  
  Enviar(){

    this.editorial_serv.grabar(this.form_edit?.value).subscribe(data=> console.log(data));
    this.router.navigate(['/list_editorial'])
    this.confirmacion();   
  }
     confirmacion() {
      Swal.fire({
        title: "Se guardo corectamente",
        icon: 'success',
      });
    }
}
