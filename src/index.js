import { createTodo } from "./modules/todo";
import { renderTodo } from "./modules/ui";
import { renderSidebar } from "./modules/sidebar";
import { createForm, formHandling } from "./modules/form";
import "./style.css";

const mainDiv = document.querySelector(".main-container");
const content = document.getElementById("content");
const body = document.getElementById("body");

const todo = [
  createTodo("hello1", "do sum1", "12-07-1998", "high"),
  createTodo("hello2", "do sum2", "12-07-1999", "med"),
  createTodo("hello3", "do sum3", "12-07-2000", "low"),
];

content.insertBefore(renderSidebar(todo), mainDiv);
const addButton = document.querySelector(".new-todo");

body.appendChild(createForm());

const modal = document.querySelector(".modal");
const cancel = document.querySelector(".cancel");

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
  const todoElement = renderTodo(newTodo, todo, modal, formHandling);
  mainDiv.appendChild(todoElement);
});
