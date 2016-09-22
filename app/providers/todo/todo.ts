import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
  Generated class for the Todo provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class Todo {
  private archivedTodos = [];

  constructor() {}

  getArchivedTodos(){
    return this.archivedTodos;
  }

  archiveTodo(todo){
    this.archivedTodos.push(todo);
  }

}

