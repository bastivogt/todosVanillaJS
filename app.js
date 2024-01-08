"use strict";
import { TodoServiceInstance } from "./services/TodoServiceInstance.js";
import data from "./mockData.js";

TodoServiceInstance.todos = data;

const elements = {
  todosContainer: document.getElementById("todos-container"),
  todoTemplate: document.getElementById("todo-template"),
  todoNewInput: document.getElementById("todo-new-input"),
  todoNewBtn: document.getElementById("todo-new-btn"),
};

function renderTodos(container, template) {
  container.innerHTML = null;
  const ulElement = document.createElement("ul");

  TodoServiceInstance.todos.forEach((todo) => {
    const tpl = template.content.cloneNode(true);
    const todoDone = tpl.querySelector(".todo-done");
    const todoID = tpl.querySelector(".todo-id");
    const todoTitle = tpl.querySelector(".todo-title");
    const todoContainer = tpl.querySelector(".todo-container");
    const todoDelete = tpl.querySelector(".todo-delete");

    todoDone.checked = todo.done;
    todoID.textContent = todo.id;
    todoTitle.textContent = todo.title;

    if (todo.done) {
      todoContainer.style["text-decoration"] = "line-through";
    }

    todoDone.addEventListener("change", (evt) => {
      console.log("done changed");
      TodoServiceInstance.updateTodo(todo.id, todo.title, !todo.done);
    });

    todoDelete.addEventListener("click", () => {
      console.log("DELETE");
      TodoServiceInstance.deleteTodo(todo.id);
    });

    ulElement.appendChild(tpl);
  });
  container.appendChild(ulElement);
}

function addNewTodo() {
  if (elements.todoNewInput.value !== "") {
    TodoServiceInstance.addTodo({
      id: new Date().getTime(),
      title: elements.todoNewInput.value,
      done: false,
    });
    elements.todoNewInput.value = "";
  }
}

TodoServiceInstance.onUpdate = function () {
  console.log("onUpdate");
  console.log(TodoServiceInstance.todos);
  renderTodos(elements.todosContainer, elements.todoTemplate);
};

TodoServiceInstance.addTodo({
  id: new Date().getTime(),
  title: "Test",
  done: false,
});

elements.todoNewBtn.addEventListener("click", () => {
  addNewTodo();
});

elements.todoNewInput.addEventListener("keyup", (evt) => {
  if (evt.key === "Enter") {
    addNewTodo();
  }
});

console.log(TodoServiceInstance.getTodoById(4));

TodoServiceInstance.updateTodo(1, "Erstes Todo", true);

renderTodos(elements.todosContainer, elements.todoTemplate);
