import { Component,OnInit } from '@angular/core';
import { CoinService } from 'src/app/services/coin.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-exchange',
  templateUrl: './exchange.component.html',
  styleUrls: ['./exchange.component.sass'],
  providers: [CoinService,CookieService]
})
export class ExchangeComponent implements OnInit {

  public data :any;
  public opciones = { style: 'decimal', useGrouping: true, maximumFractionDigits: 2 };
  public dataAux :any;
  public misFav:any;
  
  constructor(
    private _coinService: CoinService,
    private _cookieService: CookieService
  ){
    this.data = [];
    this.dataAux = [];
  }

  ngOnInit(): any {
    this.listado();
    this.listadofav();
  }

  listadofav(){
    if(this._cookieService.get('favExchange')){
        this.misFav = JSON.parse(this._cookieService.get('favExchange'));
        console.log("🚀 ~ file: cripto.component.ts:32 ~ CriptoComponent ~ listadofav ~ this.misFav:", this.misFav);
    }else{
      let favoritos: string[] = [];
      this._cookieService.set('favExchange',JSON.stringify(favoritos));
      this.misFav = JSON.parse(this._cookieService.get('favExchange'));
    }
  }

  listado(){
    this._coinService.exchange().subscribe(
      response => {
        this.data = response;
        this.dataAux = response;
        console.log(this.data);
      },
      error => {

      }
    );
  }

  onInputChange(event: any) {
    console.log('Texto escrito:', event.target.value);

    if(event.target.value.length > 2){
      this.data = this.dataAux;
      let nuevo = this.data.filter((nombre:any) => nombre.name.toLowerCase().includes(event.target.value.toLowerCase()));
      console.log(nuevo);
      this.data = nuevo;
    }else{
      this.data = this.dataAux;
    }

    
  }

  fav(id:string){
    console.log("🚀 ~ file: exchange.component.ts:70 ~ ExchangeComponent ~ fav ~ id:", id)

    if(this.misFav.indexOf(id) !== -1){
      let index = this.misFav.indexOf(id);
      this.misFav.splice(index, 1);
      this._cookieService.delete("favExchange");
      this._cookieService.set("favExchange", JSON.stringify(this.misFav));
    }else{
      if(this._cookieService.get("favExchange")){
        this.misFav = JSON.parse(this._cookieService.get("favExchange"));
        this.misFav.push(id);
        this._cookieService.set("favExchange",JSON.stringify(this.misFav));
      }
    }
    
  }
}