import { createTodo } from "./modules/todo";
import { renderTodo } from "./modules/ui";
import { renderSidebar } from "./modules/sidebar";
import "./style.css";

const mainDiv = document.querySelector(".main-container");
const content = document.getElementById("content");
content.insertBefore(renderSidebar(), mainDiv);

mainDiv.innerHTML = "";
const test = [
  createTodo("hello1", "do sum1", "12-07-1998", "high"),
  createTodo("hello2", "do sum2", "12-07-1999", "med"),
  createTodo("hello3", "do sum3", "12-07-2000", "low"),
];

test.forEach((ele) => {
  mainDiv.append(renderTodo(ele));
});
