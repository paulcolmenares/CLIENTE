import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CabeceraComponent } from './cabecera/cabecera.component';
import { MenuComponent } from './menu/menu.component';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http' 
import { RouterModule, Routes } from '@angular/router';

import { AutorComponent } from './autor/autor.component';
import { AddAutorComponent } from './add-autor/add-autor.component';
import { AutorService } from './servicios/autor.service';
import { UsuarioComponent } from './usuario/usuario.component';
import { AddUsuarioComponent } from './add-usuario/add-usuario.component';
import { UsuarioService } from './servicios/usuario.service';
import { EjemplarComponent } from './ejemplar/ejemplar.component';
import { AddEjemplarComponent } from './add-ejemplar/add-ejemplar.component';
import { EditorialComponent } from './editorial/editorial.component';
import { AddEditorialComponent } from './add-editorial/add-editorial.component';
import { AreaComponent } from './area/area.component';
import { AddAreaComponent } from './add-area/add-area.component';
import { TipoComponent } from './tipo/tipo.component';
import { AddTipoComponent } from './add-tipo/add-tipo.component';
import { TextoComponent } from './texto/texto.component';
import { PresEjemplarComponent } from './pres-ejemplar/pres-ejemplar.component';
import { DevolucionComponent } from './devolucion/devolucion.component';
import { AnulacionDevolucionComponent } from './anulacion-devolucion/anulacion-devolucion.component';
import { RolComponent } from './rol/rol.component';
import { MenusComponent } from './menus/menus.component';
import { ProcesoMenuComponent } from './proceso-menu/proceso-menu.component';
import { MenuRolComponent } from './menu-rol/menu-rol.component';
import { RolUsuarioComponent } from './rol-usuario/rol-usuario.component';
import { BusEjemplarComponent } from './bus-ejemplar/bus-ejemplar.component';
import { AddTextoComponent } from './add-texto/add-texto.component';
import { AsignarComponent } from './asignar/asignar.component';
import { AddPrestamoComponent } from './add-prestamo/add-prestamo.component';
import { AutenticadorInterceptor } from './autenticador.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { LoginComponent } from './login/login.component';
import { AddRolComponent } from './add-rol/add-rol.component';
import { AddMenuComponent } from './add-menu/add-menu.component';
import { TelefonoComponent } from './telefono/telefono.component';
import { EscribenComponent } from './escriben/escriben.component';
import { FilterPipe } from './pipes/filter.pipe';

import { MdevolComponent } from './mdevol/mdevol.component';
import { DdevolComponent } from './ddevol/ddevol.component';
import { AsigusuComponent } from './asigusu/asigusu.component';
import { CiComponent } from './ci/ci.component';
import { EmpleadosComponent } from './empleados/empleados.component';
export const routes: Routes = [ 
      { path: 'listar_autor', component: AutorComponent },
      { path: 'add_autor', component: AddAutorComponent },
      { path: 'listar_usuario', component: UsuarioComponent },
      { path: 'add_usuario', component: AddUsuarioComponent },
      { path: 'list_ejemplar', component: EjemplarComponent },
      { path: 'add_ejemplar', component: AddEjemplarComponent },
      { path: 'list_editorial', component: EditorialComponent},
      { path: 'add_editorial', component: AddEditorialComponent},
      { path: 'list_area', component: AreaComponent},
      { path: 'add_area', component: AddAreaComponent},
      { path: 'list_tipo', component: TipoComponent},
      { path: 'add_tipo', component: AddTipoComponent},
      { path: 'list_texto', component: TextoComponent},
      { path: 'list_prestamo-ejemplar', component: PresEjemplarComponent },
      { path: 'list_devol', component: DevolucionComponent},
      { path: 'list_anu-devol', component: AnulacionDevolucionComponent},
      { path: 'list_rol', component: RolComponent},
      { path: 'list_menu', component: MenusComponent},
      { path: 'list_prosmenu', component: ProcesoMenuComponent },
      { path: 'list_menurol', component: MenuRolComponent },
      { path: 'list_busqueda', component:BusEjemplarComponent },
      { path: 'add_texto', component:AddTextoComponent },
      { path: 'asig_usuario', component:AsignarComponent },
      { path: 'add_prestamo', component: AddPrestamoComponent },
      { path: 'add_rol', component: AddRolComponent},
      { path: 'add_menu', component: AddMenuComponent},
      { path: 'list_rol-user', component: RolUsuarioComponent },
      { path: 'login', component: LoginComponent},
      { path: 'add_telefono', component: TelefonoComponent},
      { path: 'asignar', component: EscribenComponent},
 
      { path: 'mdevol', component: MdevolComponent},
      { path: 'ddevol', component: DdevolComponent},
      { path: 'asignar-usuario', component: AsigusuComponent },
      { path: 'ci', component: CiComponent },



      { path: 'listar_empleados', component: EmpleadosComponent},
       ]
@NgModule({
  declarations: [
    AppComponent,
    CabeceraComponent,
    MenuComponent,
    AutorComponent,
    AddAutorComponent,
    UsuarioComponent,
    AddUsuarioComponent,
    EjemplarComponent,
    AddEjemplarComponent,
    EditorialComponent,
    AddEditorialComponent,
    AreaComponent,
    AddAreaComponent,
    TipoComponent,
    AddTipoComponent,
    TextoComponent,
    PresEjemplarComponent,
    DevolucionComponent,
    AnulacionDevolucionComponent,
    RolComponent,
    MenusComponent,
    ProcesoMenuComponent,
    MenuRolComponent,
    RolUsuarioComponent,
    BusEjemplarComponent,
    AddTextoComponent,
    AsignarComponent,
    AddPrestamoComponent,
    LoginComponent,
    AddRolComponent,
    AddMenuComponent,
    TelefonoComponent,
    EscribenComponent,
    FilterPipe,
 
    MdevolComponent,
    DdevolComponent,
    AsigusuComponent,
    CiComponent,
    EmpleadosComponent,

  
  ],
  imports: [
    BrowserModule,
     HttpClientModule, 
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot(routes), 
    NgbModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot() 
  ],
  providers: [AutorService, {provide: HTTP_INTERCEPTORS, useClass: AutenticadorInterceptor,multi: true }],
  bootstrap: [AppComponent]
})
export class AppModule { }
