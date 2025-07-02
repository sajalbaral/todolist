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
    renderSidebar(
      todos,
      projects,
      (selected) => {
        currentTab = selected;
        rerenderTodos();
      },
      setProjectOptions,
      rerenderSidebar
    ),
    mainDiv
  );

  document
    .querySelectorAll(".nav li")
    .forEach((li) => li.classList.remove("selected"));
  const currentTabEl = document.querySelector(`[data-tab="${currentTab}"]`);
  if (currentTabEl) currentTabEl.classList.add("selected");
  bindAddButton();
  updateTabCounts(todos);
}

function bindAddButton() {
  const addButton = document.querySelector(".new-todo");
  if (!addButton) return;

  addButton.addEventListener("click", () => {
    modal.classList.remove("hidden");

    const projectSelect = document.querySelector(".project-select");
    if (
      projectSelect &&
      currentTab !== "home" &&
      currentTab !== "today" &&
      currentTab !== "week"
    ) {
      projectSelect.value = currentTab;
    } else {
      projectSelect.value = "default";
    }
  });
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
  resetIdCounter(todos);
}

let projects = JSON.parse(localStorage.getItem("projects")) || ["default"];

body.appendChild(createForm());
content.insertBefore(
  renderSidebar(
    todos,
    projects,
    (selected) => {
      currentTab = selected;
      rerenderTodos();
    },
    setProjectOptions,
    rerenderSidebar
  ),
  mainDiv
);
setProjectOptions(projects);

const modal = document.querySelector(".modal");
const cancel = document.querySelector(".cancel");
const addButton = document.querySelector(".new-todo");

function setupEventListeners() {
  addButton.addEventListener("click", () => {
    modal.classList.remove("hidden");

    const projectSelect = document.querySelector(".project-select");
    if (
      projectSelect &&
      currentTab !== "home" &&
      currentTab !== "today" &&
      currentTab !== "week"
    ) {
      projectSelect.value = currentTab;
    } else {
      projectSelect.value = "default";
    }
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
      rerenderSidebar();
    }

    todos.push(newTodo);
    localStorage.setItem("todos", JSON.stringify(todos));
    rerenderTodos();
  });
}

setupEventListeners();
rerenderTodos();
