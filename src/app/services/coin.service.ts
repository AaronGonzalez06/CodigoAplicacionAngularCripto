import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class CoinService {
    constructor(
        public _http: HttpClient
    ){
    }

    show(divisa?:string):Observable<any>{
        if(divisa !== undefined){
            let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
            return this._http.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency='+ divisa +'&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=es', { headers: headers });
        }else{
            let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
            return this._http.get('https://api.coingecko.com/api/v3/coins/markets?vs_currency=eur&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=es', { headers: headers });
        }
    }

    exchange(divisa?:string):Observable<any>{
        let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.get('https://api.coingecko.com/api/v3/exchanges', { headers: headers });
    }
}
