import { createTodo } from "./modules/todo";
import { renderTodo } from "./modules/ui";
import { renderSidebar } from "./modules/sidebar";
import { createForm, formHandling } from "./modules/form";
import "./style.css";

const mainDiv = document.querySelector(".main-container");
const content = document.getElementById("content");
const body = document.getElementById("body");

content.insertBefore(renderSidebar(), mainDiv);
body.appendChild(createForm());

const modal = document.querySelector(".modal");
const cancel = document.querySelector(".cancel");
const addButton = document.querySelector(".new-todo");

mainDiv.innerHTML = "";
const test = [
  createTodo("hello1", "do sum1", "12-07-1998", "high"),
  createTodo("hello2", "do sum2", "12-07-1999", "med"),
  createTodo("hello3", "do sum3", "12-07-2000", "low"),
];

test.forEach((ele) => {
  mainDiv.append(renderTodo(ele));
});

addButton.addEventListener("click", () => {
  modal.classList.remove("hidden");
});

cancel.addEventListener("click", () => {
  modal.classList.add("hidden");
});

formHandling((todoData) => {
  const newTodo = createTodo(...todoData);
  const todoElement = renderTodo(newTodo);
  mainDiv.appendChild(todoElement);
});
