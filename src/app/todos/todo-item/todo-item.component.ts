import { Component, OnInit, Input, ViewChild, ElementRef } from '@angular/core';
import { Todo } from '../models/todo.model';
import { FormControl, Validators } from '@angular/forms';
import { Store } from '@ngrx/store';
import { AppState } from '../../app.reducer';
import { toggle, editar, eliminar } from '../todo.actions';

@Component({
  selector: 'app-todo-item',
  templateUrl: './todo-item.component.html',
  styleUrls: ['./todo-item.component.css']
})
export class TodoItemComponent implements OnInit {

  @Input() todo: Todo;

  @ViewChild('inputHtml') inputHtml: ElementRef;

  todoLocal: Todo;

  chkCompletado: FormControl;
  txtInput: FormControl;

  editando = false;

  constructor(
    private store: Store<AppState>
  ) { }

  ngOnInit(): void {
    this.todoLocal = {...this.todo};
    this.chkCompletado = new FormControl( this.todoLocal.completado );
    this.txtInput = new FormControl( this.todoLocal.texto, [Validators.required] );

    this.chkCompletado.valueChanges.subscribe( valor => {
      this.store.dispatch(toggle( { id: this.todo.id } ) );
    });
  }

  editar() {
    this.editando = true;
    this.txtInput.setValue( this.todo.texto );
    setTimeout(() => {
      this.inputHtml.nativeElement.select();
    }, 1);
  }

  terminarEdicion() {
    this.editando = false;
    if (this.txtInput.invalid) { return; }
    if (this.txtInput.value === this.todo.texto) { return; }
    this.store.dispatch( editar( { id: this.todo.id, texto: this.txtInput.value } ) );
  }

  eliminar() {
    this.store.dispatch( eliminar( { id: this.todo.id } ) );
  }

}
