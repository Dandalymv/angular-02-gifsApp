import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'gxLhU9KV2sVQrEm5V7nFozkuDaU9Xpsw';
  private _historial: string[] = [];
  public resultados: Gif[] = []; 
  private servicioUrl: string ='https://api.giphy.com/v1/gifs'

  get historial(){
    return [...this._historial];
  }

  constructor(private http:HttpClient ){

    this._historial = JSON.parse(localStorage.getItem('historial')!) || []
    this.resultados = JSON.parse(localStorage.getItem('resultado')!) || []
    // if(localStorage.getItem('historial')){
    //   this._historial = JSON.parse(localStorage.getItem('historial')!);
    // }
  }
  
  buscarGifs(query: string){

    query = query.trim().toLocaleLowerCase();

    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,9);

      localStorage.setItem('historial', JSON.stringify(this._historial));
     
    }

    const params = new HttpParams()
    .set('api_key', this.apiKey)
    .set('limit', 10)
    .set('q', query);

    console.log(params.toString())

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{params}).subscribe((respuesta) => {
      this.resultados = respuesta.data;
      localStorage.setItem('resultado', JSON.stringify(this.resultados));

    });

  }
}
