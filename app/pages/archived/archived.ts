import { Component } from '@angular/core';

import { Todo } from '../../providers/todo/todo';


/*
  Generated class for the ArchivedPage page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
  templateUrl: 'build/pages/archived/archived.html',
})
export class ArchivedPage {
  private archivedTodos = [];

  constructor(private todoProvider: Todo) {
    this.archivedTodos = this.todoProvider.getArchivedTodos();
  }
}
