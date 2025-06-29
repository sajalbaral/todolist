export function filterAndRender(
  todos,
  selectedTab,
  renderTodoFn,
  modal,
  formHandling
) {
  const mainDiv = document.querySelector(".main-container");
  mainDiv.innerHTML = "";

  let filtered = [];
  if (selectedTab === "home") filtered = todos;
  if (selectedTab === "today") {
    filtered = todos.filter((t) => isToday(new Date(t.dueDate)));
  }
  if (selectedTab === "week") {
    filtered = todos.filter((t) => isThisWeek(new Date(t.dueDate)));
  }

  filtered.forEach((t) =>
    mainDiv.append(renderTodoFn(t, todos, modal, formHandling))
  );
}
