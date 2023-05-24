import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class EjemplaresService {
  Data:any=new Object();
  nuevo: boolean;

  constructor() {
    this.nuevo=true;
    this.Data.codinv=0;
    this.Data.disponible=0;
    this.Data.estado=0;
   }

  set(datos:any) { this.Data=datos; this.nuevo=false; }
  
  get():any { this.nuevo=true; return this.Data; }

}
