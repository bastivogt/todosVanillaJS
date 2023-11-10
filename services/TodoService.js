"use strict";
import { Service } from "./Service.js";

export class TodoService extends Service {
  constructor() {
    super();
    this._todos = [];
  }

  set todos(value) {
    this._todos = value;
    this.__fireUpdate();
  }

  get todos() {
    return this._todos;
  }

  addTodo(todo) {
    this.todos.unshift(todo);
    this.__fireUpdate();
  }

  getTodoById(id) {
    const index = this.todos.findIndex((todo) => todo.id === id);
    console.log("index", index);
    if (index !== -1) return this.todos[index];
    return false;
  }

  updateTodo(id, title, done) {
    const todo = this.getTodoById(id);
    if (todo) {
      todo.title = title;
      todo.done = done;
      this.__fireUpdate();
    }
    return false;
  }

  deleteTodo(id) {
    const index = this.todos.findIndex((todo) => todo.id === id);
    if (index !== -1) {
      this.todos.splice(index, 1);
      this.__fireUpdate();
      return true;
    }

    return false;
  }
}
