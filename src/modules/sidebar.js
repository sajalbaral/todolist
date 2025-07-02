import { isToday, isThisWeek } from "date-fns";

function createList(title, name) {
  const list = document.createElement("li");
  list.setAttribute("data-tab", title);
  const span = document.createElement("span");
  span.classList.add("title");
  span.textContent = name;
  const count = document.createElement("span");
  count.classList.add("count");

  list.append(span, count);

  return list;
}

export function renderSidebar(
  todos,
  projects,
  onTabChange,
  setProjectOptions,
  rerenderSidebar
) {
  const nav = document.createElement("nav");
  nav.classList.add("side-bar");

  const navUl = document.createElement("ul");
  navUl.classList.add("nav");
  nav.appendChild(navUl);

  const home = createList("home", "home");
  const today = createList("today", "today");
  const week = createList("week", "week");

  const addButton = document.createElement("div");
  addButton.classList.add("new-todo");
  addButton.textContent = "+";

  const projectHeader = document.createElement("li");
  projectHeader.textContent = "Projects";
  const addProjectBtn = document.createElement("li");
  addProjectBtn.textContent = "+ Add Project";
  addProjectBtn.classList.add("add-project");

  navUl.append(home, today, week);

  [home, today, week].forEach((tab) => {
    tab.addEventListener("click", () => {
      const selected = tab.getAttribute("data-tab");
      document
        .querySelectorAll(".nav li")
        .forEach((li) => li.classList.remove("selected"));
      tab.classList.add("selected");
      onTabChange(selected);
    });
  });

  addProjectBtn.addEventListener("click", () => {
    const newProject = prompt("Enter new project name:").trim();
    if (
      newProject &&
      !projects.includes(newProject) &&
      newProject !== "home" &&
      newProject !== "today" &&
      newProject !== "week"
    ) {
      projects.push(newProject);
      localStorage.setItem("projects", JSON.stringify(projects));
      setProjectOptions(projects);
      rerenderSidebar();
    }
  });

  navUl.appendChild(projectHeader);
  navUl.appendChild(addProjectBtn);

  projects.forEach((proj) => {
    const projTab = createList(proj, proj);
    navUl.appendChild(projTab);
    const deleteBtn = document.createElement("span");
    deleteBtn.textContent = "×";
    deleteBtn.classList.add("delete-project");
    if (proj !== "default") {
      deleteBtn.addEventListener("click", (e) => {
        e.stopPropagation(); // Prevent tab switching
        const confirmed = confirm(
          `Delete project "${proj}" and all its tasks?`
        );
        if (!confirmed) return;

        const index = projects.indexOf(proj);
        if (index > -1) {
          projects.splice(index, 1);
          localStorage.setItem("projects", JSON.stringify(projects));
        }

        const updatedTodos = todos.filter((t) => t.project !== proj);
        localStorage.setItem("todos", JSON.stringify(updatedTodos));

        setProjectOptions(projects);
        rerenderSidebar();
      });

      projTab.appendChild(deleteBtn);
    }

    projTab.addEventListener("click", () => {
      document
        .querySelectorAll(".nav li")
        .forEach((li) => li.classList.remove("selected"));
      projTab.classList.add("selected");
      onTabChange(proj);
    });
  });

  navUl.appendChild(addButton);

  return nav;
}

export function updateTabCounts(todos) {
  const homeCount = todos.length;
  const todayCount = todos.filter((t) => isToday(new Date(t.dueDate))).length;
  const weekCount = todos.filter((t) => isThisWeek(new Date(t.dueDate))).length;

  document.querySelector('[data-tab="home"] .count').textContent = homeCount;
  document.querySelector('[data-tab="today"] .count').textContent = todayCount;
  document.querySelector('[data-tab="week"] .count').textContent = weekCount;

  const allTabs = document.querySelectorAll(".nav li[data-tab]");
  allTabs.forEach((li) => {
    const tab = li.getAttribute("data-tab");
    const countSpan = li.querySelector(".count");
    if (!["home", "today", "week"].includes(tab)) {
      const count = todos.filter((t) => t.project === tab).length;
      countSpan.textContent = count;
    }
  });
}
