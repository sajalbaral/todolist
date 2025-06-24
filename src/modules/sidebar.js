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

export function renderSidebar() {
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

  return nav;
}
