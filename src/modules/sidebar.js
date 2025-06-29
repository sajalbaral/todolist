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

export function renderSidebar(todos, onTabChange) {
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

  navUl.append(home, today, week, addButton);

  [home, today, week].forEach((tab) => {
    tab.addEventListener("click", () => {
      const selected = tab.getAttribute("data-tab");
      onTabChange(selected);
    });
  });

  return nav;
}

export function updateTabCounts(todos) {
  const homeCount = todos.length;
  const todayCount = todos.filter((t) => isToday(new Date(t.dueDate))).length;
  const weekCount = todos.filter((t) => isThisWeek(new Date(t.dueDate))).length;

  document.querySelector('[data-tab="home"] .count').textContent = homeCount;
  document.querySelector('[data-tab="today"] .count').textContent = todayCount;
  document.querySelector('[data-tab="week"] .count').textContent = weekCount;
}
