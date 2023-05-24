import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UsuariosService {
 
  Data:any=new Object();
  nuevo: boolean;
  
  constructor() {
    this.nuevo=true;
    this.Data.codper=0;
    this.Data.nombre="";
    this.Data.ap="";
    this.Data.am="";
    this.Data.genero="";
    this.Data.tipoper="";
    this.Data.estado=0;
    this.Data.foto="";

   }
   set(datos:any) { this.Data=datos; this.nuevo=false; }
  
  get():any { this.nuevo=true; return this.Data; }
}
