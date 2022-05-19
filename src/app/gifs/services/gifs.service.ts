import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private apiKey: string = 'gxLhU9KV2sVQrEm5V7nFozkuDaU9Xpsw';
  private _historial: string[] = [];
  public resultados: Gif[] = []; 

  get historial(){
    return [...this._historial];
  }

  constructor(private http:HttpClient ){}
  
  buscarGifs(query: string){

    query = query.trim().toLocaleLowerCase();

    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,9);
    }

    this.http.get<SearchGifsResponse>(`https://api.giphy.com/v1/gifs/search?api_key=gxLhU9KV2sVQrEm5V7nFozkuDaU9Xpsw&q=${query}&limit=10`).subscribe((respuesta) => {
      console.log(respuesta.data);
      this.resultados = respuesta.data;

    });

  }
}
