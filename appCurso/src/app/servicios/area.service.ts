import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AreaService {

  destURL="http://localhost:8080/areas"
 
  header = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json'
    })
  }

  
  constructor(private http: HttpClient) { }
  
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
}
