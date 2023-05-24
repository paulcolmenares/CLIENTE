import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  
  ROL: string;
  usuario_vigente: string;
  clave_vigente: string;

  destURL="http://localhost:8080/usuarios"
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
  constructor(private http:HttpClient) {
    this.usuario_vigente = "nulo";
    this.clave_vigente = "*";
    this.ROL = "Invitado";
   }
   logout() {
    this.usuario_vigente = "nulo";  this.clave_vigente = "*"; this.ROL = "Invitado";
    console.log(this.ROL);
   
  }
   verif(usr: string, password: string) {
    this.usuario_vigente = usr;
    this.clave_vigente = password;
    this.http.get(this.destURL + "/" + usr).subscribe(
      data => {
        console.log("Acceso Válido", data);
        this.ROL = "Usuario";
      },
      error => console.log(error));
  }
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
   // const json_dato: string ="{\"rolusu\": \""+dato.rol+"\"}";
   
    console.log("hecho");
    return this.http.post(dato.rol+"/login",dato.usu, this.header1);
  }
  eliminar(dato: any){
     console.log("eliminado");
     return this.http.delete(dato.rol+"/login/"+this.getID(dato.usu));
   }
   getID(x:string):string {
    return x.substr(x.lastIndexOf("/")+1,x.length);
  }
}
