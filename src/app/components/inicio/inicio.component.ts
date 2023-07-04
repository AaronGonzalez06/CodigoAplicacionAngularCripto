import { Component,OnInit } from '@angular/core';
import { NoticasService } from 'src/app/services/noticias.service';
@Component({
  selector: 'app-inicio',
  templateUrl: './inicio.component.html',
  styleUrls: ['./inicio.component.sass'],
  providers: [NoticasService]
})
export class InicioComponent implements OnInit {

  public data :any;
  public campo: string;
  public idioma: string;
  constructor(
    private _noticiasService: NoticasService
  ){
    this.campo = "";
    this.idioma = "";
  }

  ngOnInit(): any {
    this.noticias();
  }

  noticias(){
    this._noticiasService.show().subscribe(
      response => {
        this.data = response.articles;
        console.log(this.data);
      },
      error => {

      }
    );
  }

  buscador(){
    this._noticiasService.avanzada(this.campo,this.idioma).subscribe(
      response => {
        if(response.totalResults == 0){
          alert("Sin resultados en la busqueda");
        }else{
          this.data = response.articles;
        }
      },
      error => {
        console.log(error);
      }
    )
  }

  change(idioma:string){
    this.idioma =idioma;
    this.listadoIdiomaPersonalizado();
  }

  listadoIdiomaPersonalizado(){
    this._noticiasService.show(this.idioma).subscribe(
      response => {
        this.data = response.articles;
        
      },
      error => {
      }
    );
  }
}
