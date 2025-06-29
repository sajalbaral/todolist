import { createTodo } from "./modules/todo";
import { renderTodo } from "./modules/ui";
import { renderSidebar } from "./modules/sidebar";
import { createForm, formHandling } from "./modules/form";
import "./style.css";

const mainDiv = document.querySelector(".main-container");
const content = document.getElementById("content");
const body = document.getElementById("body");

const todo = [];

const stored = localStorage.getItem("todos");
if (stored) {
  const parsed = JSON.parse(stored);
  const restored = parsed.map((t) =>
    createTodo(t.title, t.description, t.dueDate, t.priority, t.completed, t.id)
  );
  todo.push(...restored);
  resetIdCounter(todo);
}

body.appendChild(createForm());
content.insertBefore(renderSidebar(todo), mainDiv);

const modal = document.querySelector(".modal");
const cancel = document.querySelector(".cancel");
const addButton = document.querySelector(".new-todo");

mainDiv.innerHTML = "";

todo.forEach((ele) => {
  mainDiv.append(renderTodo(ele, todo, modal, formHandling));
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

  todo.push(newTodo);
  localStorage.setItem("todos", JSON.stringify(todo));
  const todoElement = renderTodo(newTodo, todo, modal, formHandling);
  mainDiv.appendChild(todoElement);
});
