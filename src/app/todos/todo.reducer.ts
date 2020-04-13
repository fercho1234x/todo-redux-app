import { createReducer, on } from '@ngrx/store';
import { crear, toggle, editar, eliminar, toggleAll, limpiarCompletados } from './todo.actions';
import { Todo } from './models/todo.model';

export const initialState: Todo[] = [
  new Todo('Salvar el mundo!'),
  new Todo('Salvar el mundo 2!'),
  new Todo('Salvar el mundo 3!'),
  new Todo('Salvar el mundo 4!'),
  new Todo('Salvar el mundo 5!'),
];

const _todoReducer = createReducer(initialState,
    // ... prep Para crear un nuevo arreglo, toma un elemento del arreglo/objeto de manera independiente
  on(crear, ( state, { texto } ) => [...state, new Todo( texto )] ),
  on(toggle, ( state, { id } ) => {
    return state.map( todo => {
      if (todo.id === id ) {
        return {
          ...todo,
          completado: !todo.completado
        };
      } else {
        return todo;
      }
    });
  }),
  on(editar, ( state, { id, texto } ) => {
    return state.map( todo => {
      if (todo.id === id ) {
        return {
          ...todo,
          texto: texto
        };
      } else {
        return todo;
      }
    });
  }),
  on(eliminar, ( state, { id } ) => state.filter( todo => {
    if (todo.id !== id) {
      return todo;
    }
  })),
  on(toggleAll, ( state, { completado } ) => {
    return state.map( todo => {
      return {
        ...todo,
        completado
      };
    });
  }),
  on(limpiarCompletados, state => {
    return state.filter( todo => !todo.completado);
  }),
);

export function todoReducer(state, action) {
  return _todoReducer(state, action);
}
