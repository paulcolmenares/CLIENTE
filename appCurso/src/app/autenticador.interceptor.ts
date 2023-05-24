import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import { Observable } from 'rxjs';
import { UserService } from './servicios/user.service';

@Injectable()
export class AutenticadorInterceptor implements HttpInterceptor {

  constructor(private users: UserService) {}

  
  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    
    request = request.clone({
      setHeaders: {
       // authorization: `Basic ${ btoa('brisa:abc') }`
        authorization: `Basic ${ btoa( this.users.usuario_vigente+':'+this.users.clave_vigente) }`
    }
    });

  return next.handle(request);
}
}