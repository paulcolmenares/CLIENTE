import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TiposService {
  Data:any=new Object();
  nuevo: boolean;

  constructor() {
    this.nuevo=true;
    this.Data.codtipo=0;
    this.Data.nombre="";
    this.Data.estado=0;
    this.Data.sw="";
   }

  set(datos:any) { this.Data=datos; this.nuevo=false; }
  
  get():any { this.nuevo=true; return this.Data; }
}
