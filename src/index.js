import { createTodo } from "./modules/todo";
import "./style.css";

const test = createTodo("hello", "do sum", "2025-92-23", "high");

console.log(test);
test.toggleComplete();
console.log(test);
