import { Component,OnInit } from '@angular/core';
import { CoinService } from 'src/app/services/coin.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-cripto',
  templateUrl: './cripto.component.html',
  styleUrls: ['./cripto.component.sass'],
  providers: [CoinService,CookieService]
})
export class CriptoComponent implements OnInit {

  public data :any;
  public opciones = { style: 'decimal', useGrouping: true, maximumFractionDigits: 2 };
  public dataAux:any;
  public misFav:any;
  public divisa: string;
  public simbolo: string;
  public error: string;
  
  constructor(
    private _coinService: CoinService,
    private _cookieService: CookieService
  ){
    this.divisa = '';
    this.simbolo = "€";
    this.error = '';
  }

  ngOnInit(): any {
    this.listado();
    this.listadofav();
  }

  listadofav(){
    if(this._cookieService.get('fav')){
        this.misFav = JSON.parse(this._cookieService.get('fav'));
        console.log("🚀 ~ file: cripto.component.ts:32 ~ CriptoComponent ~ listadofav ~ this.misFav:", this.misFav);
    }else{
      let favoritos: string[] = [];
      this._cookieService.set('fav',JSON.stringify(favoritos));
      this.misFav = JSON.parse(this._cookieService.get('fav'));
    }
  }

  listado(){
    this._coinService.show().subscribe(
      response => {
        this.data = response;
        console.log("🚀 ~ file: cripto.component.ts:31 ~ CriptoComponent ~ this.data:", this.data);
        this.dataAux = response;
        
      },
      error => {
        this.error = 'error';
        alert("Es una API gratuita se han acabado las peticiones, espere para volver a hacerla.");
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
      this._cookieService.delete("fav");
      this._cookieService.set("fav", JSON.stringify(this.misFav));
    }else{
      if(this._cookieService.get("fav")){
        this.misFav = JSON.parse(this._cookieService.get("fav"));
        this.misFav.push(id);
        this._cookieService.set("fav",JSON.stringify(this.misFav));
      }
    }
    
  }

  change(coin:string){
    this.divisa =coin;
    if(this.divisa == 'eur'){
      this.simbolo = "€";
    }else{

      this.simbolo = "$";
    }
    this.listadoDivisa();
  }

  listadoDivisa(){
    this._coinService.show(this.divisa).subscribe(
      response => {
        this.data = response;
        console.log("🚀 ~ file: cripto.component.ts:31 ~ CriptoComponent ~ this.data:", this.data);
        this.dataAux = response;
        
      },
      error => {
        alert("Es una API gratuita se han acabado las peticiones, espere para volver a hacerla.");
      }
    );
  }
}
