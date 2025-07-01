function createLabels(title, type) {
  const label = document.createElement("label");
  label.textContent = title;
  label.textContent = title === "dueDate" ? "Due Date" : title;

  const input = document.createElement("input");
  input.type = type;
  input.name = title;
  input.required = true;

  if (title === "dueDate") {
    input.min = new Date().toISOString().split("T")[0];
  }

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
  formDiv.id = "todo-form";

  const newTodo = document.createElement("h2");
  newTodo.textContent = "Add new todo";

  const title = createLabels("title", "text");

  const description = document.createElement("label");
  description.textContent = "Description";
  const textArea = document.createElement("textarea");
  textArea.name = "description";
  description.appendChild(textArea);

  const dueDate = createLabels("dueDate", "date");

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

  const projectLabel = document.createElement("label");
  projectLabel.textContent = "Project";

  const projectSelect = document.createElement("select");
  projectSelect.name = "project";
  projectSelect.classList.add("project-select");

  const defaultOption = createOptions("default", "Default");
  projectSelect.appendChild(defaultOption);
  projectLabel.appendChild(projectSelect);

  formButtons.append(submit, cancel);

  formDiv.append(
    newTodo,
    title,
    description,
    dueDate,
    prio,
    formButtons,
    projectLabel
  );

  return formDiv;
}

export function createForm() {
  const modal = document.createElement("div");
  modal.classList.add("modal", "hidden");
  modal.appendChild(formTemplate());

  return modal;
}

let currentSubmitListener = null;

export function formHandling(callback) {
  const grabForm = document.getElementById("todo-form");

  if (currentSubmitListener) {
    grabForm.removeEventListener("submit", currentSubmitListener);
  }

  const submitListener = (event) => {
    event.preventDefault();

    const title = grabForm.title.value.trim();
    const description = grabForm.description.value.trim();
    const dueDate = grabForm.dueDate.value;
    const priority = grabForm.priority.value;
    const project = grabForm.project.value;

    if (!title) {
      alert("fill out the title");
      return;
    }

    callback({ title, description, dueDate, priority, project });

    grabForm.reset();
    document.querySelector(".modal").classList.add("hidden");
  };

  grabForm.addEventListener("submit", submitListener);
  currentSubmitListener = submitListener;
}

export function setProjectOptions(projects) {
  const select = document.querySelector(".project-select");
  if (!select) return;

  select.innerHTML = "";
  projects.forEach((proj) => {
    const option = createOptions(proj, proj);
    select.appendChild(option);
  });
}
