import { Component, OnInit } from '@angular/core';
import { AreaService } from '../servicios/area.service';
import { EditorialService } from '../servicios/editorial.service';

@Component({
  selector: 'app-bus-ejemplar',
  templateUrl: './bus-ejemplar.component.html',
  styleUrls: ['./bus-ejemplar.component.css']
})
export class BusEjemplarComponent implements OnInit {
  edi: any=[];
  are: any=[];
  cont: any;

  constructor( private serv1: AreaService, private serv2: EditorialService) { }

  ngOnInit(): void {
    this.serv1.list().subscribe(data =>{ console.info(data); this.are=data._embedded.areas;})
    this.serv2.list().subscribe(data =>{ 
      console.info(data); this.edi=data._embedded.editorials;})
  }

}
