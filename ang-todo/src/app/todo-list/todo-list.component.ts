import { Component } from '@angular/core';
import { FormControl } from '@angular/forms';
import { TodoState, Todo } from '../models/todos';
import { TodosService } from '../services/todos.service';
import { TODO_DATA_SAVER } from '../data-saver/data-saver.interface';
import { LocalTodoDataSaver } from '../data-saver/data-saver.localdb';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.css'],
  providers: [
    TodosService,
    {
      provide: TODO_DATA_SAVER,
      useClass: LocalTodoDataSaver,
    },
  ],
})
export class TodoListComponent {
  newTodo = new FormControl('');

  constructor(private todoService: TodosService) {}

  getTodoList(): Todo[] {
    return this.todoService.getAllTodos();
  }

  addTodo(e: any): void {
    e.preventDefault();
    if (!this.newTodo.value) return;
    this.todoService.add(this.newTodo.value);
    this.newTodo.setValue('');
  }

  delTodo(id: number) {
    this.todoService.delete(id);
  }

  updateState(id: number, nowState: string) {
    if (nowState === TodoState.NORMAL)
      this.todoService.updateState(id, TodoState.DONE);
    else this.todoService.updateState(id, TodoState.NORMAL);
  }
}
