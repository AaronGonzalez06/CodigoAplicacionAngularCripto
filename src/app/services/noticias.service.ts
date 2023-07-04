import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable()
export class NoticasService {
    constructor(
        public _http: HttpClient
    ){
    }

    show(idioma?:string):Observable<any>{
        console.log("🚀 ~ file: noticias.service.ts:13 ~ NoticasService ~ show ~ idioma:", idioma)
        if(idioma != undefined){
            let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
            return this._http.get('https://newsapi.org/v2/top-headlines?apiKey=1a45b3ad038b4cc498d6da75a97d230c&language='+idioma+'&category=business', { headers: headers });
        
        }else{
            let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
            return this._http.get('https://newsapi.org/v2/top-headlines?apiKey=1a45b3ad038b4cc498d6da75a97d230c&language=en&category=business', { headers: headers });    
        }
    }

    avanzada(palabra:string,idioma?:string):Observable<any>{
        if(idioma != undefined){
            let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
            return this._http.get('https://newsapi.org/v2/top-headlines?apiKey=1a45b3ad038b4cc498d6da75a97d230c&q='+palabra+'&language='+idioma+'&category=business', { headers: headers });
        }else{
            let headers = new HttpHeaders().set('Content-Type', 'application/x-www-form-urlencoded');
            return this._http.get('https://newsapi.org/v2/top-headlines?apiKey=1a45b3ad038b4cc498d6da75a97d230c&q='+palabra+'&language=en&category=business', { headers: headers });
        }
    }
}
