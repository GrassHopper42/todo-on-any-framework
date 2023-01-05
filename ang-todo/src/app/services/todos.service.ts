import { Inject, Injectable } from '@angular/core';
import {
  TodoDataSaver,
  TODO_DATA_SAVER,
} from '../data-saver/data-saver.interface';
import { TodoState, Todo } from '../models/todos';

@Injectable({
  providedIn: 'root',
})
export class TodosService {
  constructor(@Inject(TODO_DATA_SAVER) private db: TodoDataSaver) {}

  getAllTodos(): Todo[] {
    return this.db.findAllTodos();
  }

  add(todo: string) {
    const prevTodos = this.db.findAllTodos();

    const newTodoObj: Todo = {
      id: this.getAllTodos().length + 1,
      content: todo,
      state: TodoState.NORMAL,
    };

    const newTodos = prevTodos.concat(newTodoObj);

    this.db.save(newTodos);
  }

  delete(id: number) {
    this.db.delete(id);
  }

  updateState(id: number, state: TodoState) {
    const updatedTodo: Todo | undefined = this.db
      .findAllTodos()
      .filter((todo) => todo.id === id)
      .map((todo) => {
        todo.state = state;
        return todo;
      })
      .pop();

    if (updatedTodo) this.db.update(id, updatedTodo);
    else console.log('업데이트 실패');
  }
}
