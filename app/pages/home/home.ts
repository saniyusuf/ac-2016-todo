import { Component } from '@angular/core';
import { NavController, AlertController, ToastController, reorderArray } from 'ionic-angular';
import { Todo} from '../../providers/todo/todo'

import { ArchivedPage } from '../archived/archived'

@Component({
  templateUrl: 'build/pages/home/home.html'
})
export class HomePage {
  private todos = [];
  private archivedTodos = [];
  private reorderEnabled: boolean = false

  constructor(
    public navCtrl: NavController,
    public todoAlertController: AlertController,
    public todoToastController: ToastController,
    private todoProvider: Todo) { }

  addTodo() {
    let addTodo = this.todoAlertController.create({
      title: 'Add',
      message: 'Enter Your ToDo Item',
      inputs: [
        {
          name: 'todo'
        }
      ],
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel'
        },
        {
          text: 'Add ToDo',
          handler: (data) => {
            this.todos.push({
              id: Date.now(),
              title: data.todo
            });

            let dismissAlert = addTodo.dismiss();
            let addTodoToast = this.todoToastController.create({
              message: 'ToDo Added',
              duration: 1000
            });

            dismissAlert.then(() => {
              addTodoToast.present();
            });
          }

        }
      ]
    });
    addTodo.present();
  }

  deleteTodo(todoID) {
    this.todos.forEach((todo, index) => {
      if (todo.id === todoID) {
        this.todos.splice(index, 1);
      }
    })
  }

  editTodo(todoID) {
    this.todos.forEach((todo, index) => {
      if (todo.id === todoID) {
        let editTodo = this.todoAlertController.create({
          title: 'Edit ToDo',
          inputs: [
            {
              name: 'todo',
              value: todo.title
            }
          ],
          buttons: [
            {
              text: 'Cancel',
              role: 'cancel'
            },
            {
              text: 'Save Change',
              handler: (data) => {
                this.todos[index].title = data.todo;

                let dismissAlert = editTodo.dismiss();
                let addTodoToast = this.todoToastController.create({
                  message: 'Changes Saved',
                  duration: 1500
                });

                dismissAlert.then(() => {
                  addTodoToast.present();
                });
              }
            }
          ]
        });
        editTodo.present();
      }
    })
  }

  enableReorder() {
    this.reorderEnabled = !this.reorderEnabled;
  }

  reorderTodos(indexes) {
    this.todos = reorderArray(this.todos, indexes);
  }

  // reorderTodos(indexes) {
  //   let element = this.todos[indexes.from];
  //   this.todos.splice(indexes.from, 1);
  //   this.todos.splice(indexes.to, 0, element);
  // }

  archiveTodo(todoID) {
    this.todos.forEach((todo, index) => {
      if (todo.id === todoID) {
        this.todoProvider.archiveTodo(todo);
      }
    })

    this.deleteTodo(todoID);
    let archiveToast = this.todoToastController.create({
      message: 'ToDo Archived',
      duration: 1200
    });
    archiveToast.present();
  }

  // archiveTodo(todoID){
  //    this.todos.forEach((todo, index)=>{
  //     if (todo.id === todoID){
  //       this.archivedTodos.push(todo);
  //     }
  //   })

  //   this.deleteTodo(todoID);
  //   let archiveToast = this.todoToastController.create({
  //     message: 'ToDo Archived',
  //     duration: 1200
  //   });
  //   archiveToast.present();
  // }

  navigateToArchivedTodos(){
    this.navCtrl.push(ArchivedPage);
  }

}
