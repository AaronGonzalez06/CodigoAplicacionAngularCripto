import { ModuleWithProviders } from "@angular/core";
import { Routes, RouterModule } from "@angular/router";

import { InicioComponent } from "./components/inicio/inicio.component";
import { CriptoComponent } from "./components/cripto/cripto.component";
import { ExchangeComponent } from "./components/exchange/exchange.component";
import { FavoritoComponent } from "./components/favorito/favorito.component";
import { OpcionesComponent } from "./components/opciones/opciones.component";
const appRoutes: Routes = [
    {path: '', component: InicioComponent},
    {path: 'Inicio', component: InicioComponent},
    {path: 'Criptomonedas', component: CriptoComponent},
    {path: 'Exchange', component: ExchangeComponent},
    {path: 'Favorito', component: FavoritoComponent},
    {path: 'Opciones', component: OpcionesComponent},
    {path: '**', component: InicioComponent}
];

export const appRoutingProviders: any[] = [];
export const routing: ModuleWithProviders<any> = RouterModule.forRoot(appRoutes);