import { isToday, isThisWeek, parseISO } from "date-fns";
import { updateTabCounts } from "./sidebar.js";

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
  else if (selectedTab === "today") {
    filtered = todos.filter((t) => t.dueDate && isToday(parseISO(t.dueDate)));
  } else if (selectedTab === "week") {
    filtered = todos.filter(
      (t) => t.dueDate && isThisWeek(new Date(t.dueDate))
    );
  } else {
    filtered = todos.filter((t) => t.project === selectedTab);
  }

  filtered.forEach((t) =>
    mainDiv.append(
      renderTodoFn(t, todos, modal, formHandling, selectedTab, () =>
        filterAndRender(todos, selectedTab, renderTodoFn, modal, formHandling)
      )
    )
  );
  updateTabCounts(todos);
}
