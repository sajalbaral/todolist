import { createTodo, resetIdCounter } from "./modules/todo";
import { renderTodo } from "./modules/ui";
import { renderSidebar, updateTabCounts } from "./modules/sidebar";
import { createForm, formHandling, setProjectOptions } from "./modules/form";
import { filterAndRender } from "./modules/filterAndRender";
import "./style.css";

function rerenderTodos() {
  filterAndRender(todos, currentTab, renderTodo, modal, formHandling);
  updateTabCounts(todos);
}

function rerenderSidebar() {
  const oldSidebar = document.querySelector(".side-bar");
  oldSidebar.remove();
  content.insertBefore(
    renderSidebar(todos, projects, (selected) => {
      currentTab = selected;
      rerenderTodos();
    }),
    mainDiv
  );
}

const mainDiv = document.querySelector(".main-container");
const content = document.getElementById("content");
const body = document.getElementById("body");

let currentTab = "home";
let todos = [];
const stored = localStorage.getItem("todos");
if (stored) {
  todos = JSON.parse(stored).map((t) =>
    createTodo(t.title, t.description, t.dueDate, t.priority, t.completed, t.id)
  );
}

let projects = JSON.parse(localStorage.getItem("projects")) || ["default"];
setProjectOptions(projects);

body.appendChild(createForm());
content.insertBefore(
  renderSidebar(todos, projects, (selected) => {
    currentTab = selected;
    rerenderTodos();
  }),
  mainDiv
);

const modal = document.querySelector(".modal");
const cancel = document.querySelector(".cancel");
const addButton = document.querySelector(".new-todo");

function setupEventListeners() {
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
      todoData.priority,
      false,
      undefined,
      todoData.project
    );

    if (!projects.includes(todoData.project)) {
      projects.push(todoData.project);
      localStorage.setItem("projects", JSON.stringify(projects));
      setProjectOptions(projects);
      rerenderSidebar();
    }

    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
    rerenderTodos();
  });
}

setupEventListeners();
rerenderTodos();
