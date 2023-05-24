import { Component, OnInit, ViewChild } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import Swal from 'sweetalert2';
import { AreaService } from '../servicios/area.service';
import { AreasService } from '../servicios/areas.service';

@Component({
  selector: 'app-add-area',
  templateUrl: './add-area.component.html',
  styleUrls: ['./add-area.component.css']
})
export class AddAreaComponent implements OnInit {
  area: any;
  @ViewChild('form_area') form_are?: NgForm;

  constructor(private area_serv: AreaService,private serv2: AreasService,
    private router: Router ) { }

  ngOnInit(): void {
    this.area=this.serv2.get();
  }
  
  Enviar(){

    this.area_serv.grabar(this.form_are?.value).subscribe(data=> console.log(data));
    this.router.navigate(['/list_area'])
    this.confirmacion();
     }
     confirmacion() {
      Swal.fire({
        title: "Se guardo corectamente",
        icon: 'success',
      });
    }

}
