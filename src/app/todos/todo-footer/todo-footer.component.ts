import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { filtrosValidos, setFiltro } from '../filtro/filtro.actions';
import { limpiarCompletados } from '../todo.actions';

@Component({
  selector: 'app-todo-footer',
  templateUrl: './todo-footer.component.html',
  styleUrls: ['./todo-footer.component.css']
})
export class TodoFooterComponent implements OnInit {

  filtroActual: filtrosValidos = 'todos';

  filtros: filtrosValidos[] = ['todos', 'completados', 'pendiente'];

  tareasPendientes: number = 0;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {

    this.store.subscribe( state => {
      this.filtroActual = state.filtro;
      this.tareasPendientes = state.todos.filter( ( todo ) => {
        return !todo.completado;
      }).length;
    });

    // this.store.select('filtro').subscribe( filtro => {
    //   this.filtroActual = filtro;
    //   console.log( filtro );
    // });

  }

  cambiarFiltro( filtro: filtrosValidos ) {
    this.store.dispatch( setFiltro( { filtro } ) );
  }

  borrarCompletados() {
    this.store.dispatch( limpiarCompletados() );
  }

}
