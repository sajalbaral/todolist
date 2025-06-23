import { createTodo } from "./modules/todo";
import { renderTodo } from "./modules/ui";
import "./style.css";

const mainDiv = document.querySelector(".main-container");

const test = createTodo("hello", "do sum", "2025-92-23", "high");

const render = renderTodo(test);

mainDiv.appendChild(render);
