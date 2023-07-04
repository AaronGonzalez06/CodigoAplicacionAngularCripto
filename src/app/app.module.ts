import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { routing, appRoutingProviders } from './app.routing';
import { AppComponent } from './app.component';
import { InicioComponent } from './components/inicio/inicio.component';
import { CriptoComponent } from './components/cripto/cripto.component';
import { ExchangeComponent } from './components/exchange/exchange.component';
import { CookieService } from 'ngx-cookie-service';
import { FavoritoComponent } from './components/favorito/favorito.component';
import { OpcionesComponent } from './components/opciones/opciones.component';

@NgModule({
  declarations: [
    AppComponent,
    InicioComponent,
    CriptoComponent,
    ExchangeComponent,
    FavoritoComponent,
    OpcionesComponent
  ],
  imports: [
    BrowserModule,
    routing,
    HttpClientModule,
    FormsModule
  ],
  providers: [
    appRoutingProviders,
    CookieService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
