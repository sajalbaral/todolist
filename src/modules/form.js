function createLabels(title, type) {
  const label = document.createElement("label");
  label.textContent = title;

  const input = document.createElement("input");
  input.type = type;
  input.name = title.toLowerCase();
  input.required = true;

  label.appendChild(input);

  return label;
}

function createOptions(value, text) {
  const option = document.createElement("option");
  option.value = value;
  option.innerText = text;

  return option;
}

function formTemplate() {
  const formDiv = document.createElement("form");
  formDiv.classList.add("todo-form");

  const newTodo = document.createElement("h2");
  newTodo.textContent = "Add new todo";

  const title = createLabels("title", "text");

  const description = document.createElement("label");
  description.textContent = "Description";
  const textArea = document.createElement("textarea");
  textArea.name = "description";
  description.appendChild(textArea);

  const dueDate = createLabels("Due Date", "date");

  const prio = document.createElement("label");
  prio.textContent = "Priority";
  const select = document.createElement("select");
  select.name = "priority";

  const lowOption = createOptions("low", "Low");
  const medOption = createOptions("med", "Medium");
  const highOption = createOptions("high", "High");
  select.append(lowOption, medOption, highOption);
  prio.appendChild(select);

  const formButtons = document.createElement("div");
  formButtons.classList.add("form-buttons");
  const submit = document.createElement("button");
  submit.type = "submit";
  submit.textContent = "Add";

  const cancel = document.createElement("button");
  cancel.type = "button";
  cancel.classList.add("cancel");
  cancel.textContent = "Cancel";

  formButtons.append(submit, cancel);

  formDiv.append(newTodo, title, description, dueDate, prio, formButtons);

  return formDiv;
}

export function createForm() {
  const modal = document.createElement("div");
  modal.classList.add("modal", "hidden");
  modal.appendChild(formTemplate());

  return modal;
}

export function formHandling(callback) {
  const grabForm = document.getElementById("todo-form");
  grabForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = grabForm.title.value;
    if (title === "") alert("fill out the title");

    const description = grabForm.description.value;
    const dueDate = grabForm.dueDate.value;
    const priority = grabForm.priority.value;

    callback({ title, description, dueDate, priority });
    grabForm.reset();
    const modal = document.querySelector(".modal");
    modal.classList.add("hidden");
  });
}
