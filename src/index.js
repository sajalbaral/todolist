import { createTodo } from "./modules/todo";
import { renderTodo } from "./modules/ui";
import { renderSidebar } from "./modules/sidebar";
import { createForm, formHandling } from "./modules/form";
import "./style.css";

const mainDiv = document.querySelector(".main-container");
const content = document.getElementById("content");
const body = document.getElementById("body");

let todos = [];
const stored = localStorage.getItem("todos");
if (stored) {
  todos = JSON.parse(stored).map((t) =>
    createTodo(t.title, t.description, t.dueDate, t.priority, t.completed, t.id)
  );
}

body.appendChild(createForm());
content.insertBefore(renderSidebar(todos), mainDiv);

const modal = document.querySelector(".modal");
const cancel = document.querySelector(".cancel");
const addButton = document.querySelector(".new-todo");

mainDiv.innerHTML = "";

todos.forEach((ele) => {
  mainDiv.append(renderTodo(ele, todos, modal, formHandling));
});

addButton.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

cancel.addEventListener("click", () => {
  modal.classList.add("hidden");
});

formHandling((todoData) => {
  const newTodo = createTodo(
    todoData.title,
    todoData.description,
    todoData.dueDate,
    todoData.priority
  );

  todos.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todos));
  const todoElement = renderTodo(newTodo, todos, modal, formHandling);
  mainDiv.appendChild(todoElement);
});
