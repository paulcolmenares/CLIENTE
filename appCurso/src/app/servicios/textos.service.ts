import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class TextosService {
  Data:any=new Object();
  nuevo: boolean;

  constructor() {
    this.nuevo=true;
    this.Data.codt=0;
    this.Data.titulo="";
    this.Data.isbn="";
    this.Data.edicion=0;
    this.Data.resumen="";
    this.Data.fechapub="";
   }

  set(datos:any) { this.Data=datos; this.nuevo=false; }
  
  get():any { this.nuevo=true; return this.Data; }
}
