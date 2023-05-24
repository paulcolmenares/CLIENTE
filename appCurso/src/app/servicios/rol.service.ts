import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RolService {
  destURL="http://localhost:8080/roles"
  header = {
    headers: new HttpHeaders({
     'Content-Type': 'application/json'
  
    })
    
  }
  header1 = {
    headers: new HttpHeaders({
    'Content-Type': 'text/uri-list'
    })
    
  }

  constructor(private http:HttpClient) { }
  list():Observable<any> {
    return this.http.get (this.destURL);
  }
grabar(dato: any){
  const data_post=JSON.stringify(dato);
   return this.http.post(this.destURL, data_post, this.header);
}

borrar(url:string){
  return this.http.delete(url);
}
grabaremos(dato: any){  
  console.log("hecho");
  return this.http.post(dato.menu+"/codrol",dato.rol, this.header1);
}
eliminar(dato: any){
   console.log("eliminado");
   return this.http.delete(dato.menu+"/codrol/"+this.getID(dato.rol));
 }
 getID(x:string):string {
  return x.substr(x.lastIndexOf("/")+1,x.length);
}


}
