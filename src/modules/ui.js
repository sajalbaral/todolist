function createDiv(tag, className, textContent) {
  const element = document.createElement(tag);
  element.classList.add(className);
  element.textContent = textContent;

  return element;
}

function createFontAwesome(tag, iconClass, iconName) {
  const icon = document.createElement(tag);
  icon.classList.add(iconClass, iconName);

  return icon;
}

export function renderTodo(todoObj, todoArr = []) {
  const div = document.createElement("div");
  div.classList.add("todo");
  div.setAttribute("data-id", todoObj.id);

  const checkBox = document.createElement("input");
  checkBox.type = "checkbox";
  checkBox.classList.add("todo_check");

  const taskInfo = document.createElement("div");
  taskInfo.classList.add("task-info");
  const taskTitle = createDiv("div", "task-title", todoObj.title);
  const taskDetail = createDiv("div", "details", todoObj.description);
  taskInfo.append(taskTitle, taskDetail);

  const taskDate = createDiv("div", "date", todoObj.dueDate);
  const edit = document.createElement("div");
  edit.classList.add("edit");
  const editIcon = createFontAwesome("i", "fas", "fa-pen");
  edit.appendChild(editIcon);

  const dele = document.createElement("div");
  dele.classList.add("delete");
  const deleIcon = createFontAwesome("i", "fas", "fa-trash-alt");
  dele.appendChild(deleIcon);

  div.append(checkBox, taskInfo, taskDate, edit, dele);

  checkBox.addEventListener("click", () => {
    if (checkBox.checked) {
      taskTitle.classList.add("completed");
      taskDetail.classList.add("completed");
    } else {
      taskTitle.classList.remove("completed");
      taskDetail.classList.remove("completed");
    }
  });

  dele.addEventListener("click", () => {
    const todoId = todoObj.id;
    const index = todoArr.findIndex((t) => t.id === todoId);
    if (index !== -1) {
      todoArr.splice(index, 1);
      div.remove();
    }
  });

  return div;
}
