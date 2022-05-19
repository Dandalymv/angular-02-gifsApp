import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styles: [
  ]
})
export class SidebarComponent {

  constructor(private historico: GifsService) { }

  historicoAlmacenado: GifsService[] = [];

  get historial(){
    return this.historico.historial
  }

  buscar(termino: string){
    this.historico.buscarGifs(termino);
  }

}
