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

export function renderSidebar(todos) {
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

  const filterAndRender = (selectedTab) => {
    const mainDiv = document.querySelector(".main-container");
    mainDiv.innerHTML = "";

    let filtered = [];
    if (selectedTab === "home") filtered = todos;
    if (selectedTab === "today")
      filtered = todos.filter((t) => isToday(t.dueDate));
    if (selectedTab === "week")
      filtered = todos.filter((t) => isThisWeek(t.dueDate));

    filtered.forEach((t) => mainDiv.append(renderTodo(t)));
  };

  [home, today, week].forEach((tab) => {
    tab.addEventListener("click", () => {
      const selected = tab.getAttribute("data-tab");
      filterAndRender(selected);
    });
  });

  return nav;
}
