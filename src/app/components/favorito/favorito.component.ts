import { Component,OnInit } from '@angular/core';
import { CoinService } from 'src/app/services/coin.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-favorito',
  templateUrl: './favorito.component.html',
  styleUrls: ['./favorito.component.sass'],
  providers: [CoinService,CookieService]
})
export class FavoritoComponent implements  OnInit {

  public data :any;
  public auxCripto:any;
  public opciones = { style: 'decimal', useGrouping: true, maximumFractionDigits: 2 };
  public dataExchange:any;
  public selectedExchange:string;
  public AuxExchange: any;
  public simbolo: string;
  
  constructor(
    private _coinService: CoinService,
    private _cookieService: CookieService
  ){
    this.selectedExchange = "";
    this.data = [];
    this.dataExchange = [];
    this.simbolo = "€";
  }

  ngOnInit(): any {
    this.listado();
    this.listadoExchange();
  }

  listado(){
    this._coinService.show().subscribe(
      response => {
        this.data = response;

        if(this._cookieService.get("fav")){
          let favcrip = JSON.parse(this._cookieService.get("fav"));
          let criptosFav = this.data.filter((cripto: any) => favcrip.includes(cripto.id));
          this.data = criptosFav;
          this.auxCripto = criptosFav;
        }else{
          let auxCrypto: string[] = [];
          this.data = auxCrypto;
        }
       
      },
      error => {

      }
    );
  }

  listadoExchange(){
    this._coinService.exchange().subscribe(
      response => {
        this.dataExchange = response;        

        if(this._cookieService.get("favExchange")){
          let favcrip = JSON.parse(this._cookieService.get("favExchange"));
          let criptosFav = this.dataExchange.filter((cripto: any) => favcrip.includes(cripto.id));
          this.dataExchange = criptosFav;
          this.AuxExchange = criptosFav;
        }else{
          let auxExchange: string[] = [];
          this.dataExchange = auxExchange;
        }
      },
      error => {

      }
    );
  }
  

  favCripto(id:string){
    console.log("🚀 ~ file: exchange.component.ts:70 ~ ExchangeComponent ~ fav ~ id:", id)
    if (this.data.indexOf(id) == -1) {
      let misCriptos:string[] =JSON.parse(this._cookieService.get("fav"));
      let quitarCripto:string[] = misCriptos.filter((x:any) => x !== id);
      this._cookieService.delete("fav");
      this._cookieService.set("fav",JSON.stringify(quitarCripto));
      this.listado();
    } 
  }

  favExchange(id:string){
    console.log("🚀 ~ file: exchange.component.ts:70 ~ ExchangeComponent ~ fav ~ id:", id)
    if (this.dataExchange.indexOf(id) == -1) {
      let misExchange:string[] =JSON.parse(this._cookieService.get("favExchange"));
      let quitarExchange:string[] = misExchange.filter((x:any) => x !== id);
      this._cookieService.delete("favExchange");
      this._cookieService.set("favExchange",JSON.stringify(quitarExchange));
      this.listadoExchange();
    }
    
  }

  check(){
    console.log(this.selectedExchange);
  }

  onInputChange(event: any){

    if(this.selectedExchange == ''){
      alert("Seleciona una opción para buscar");
    }else{

      if(this.selectedExchange == 'exchange'){

        if(event.target.value.length > 2){
          this.dataExchange = this.AuxExchange;
          let nuevo = this.dataExchange.filter((nombre:any) => nombre.name.toLowerCase().includes(event.target.value.toLowerCase()));
          if(nuevo.length == 0){
            alert("Sin resultados:" + event.target.value);
            this.dataExchange = this.AuxExchange;
          }else{
            this.dataExchange = nuevo;
          }
        }else{
          this.dataExchange = this.AuxExchange;
        }

      } else if(this.selectedExchange == 'criptomoneda'){

        if(event.target.value.length > 2){
          this.data = this.auxCripto;
          let nuevo = this.data.filter((nombre:any) => nombre.name.toLowerCase().includes(event.target.value.toLowerCase()));
          if(nuevo.length == 0){
            alert("Sin resultados:" + event.target.value);
            this.data = this.auxCripto;
          }else{
            this.data = nuevo;
          }
        }else{
          this.data = this.auxCripto;
        }

      }
    }

  }
}
