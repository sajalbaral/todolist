let idCounter = 0;
export function createTodo(
  title,
  description = "",
  dueDate = "",
  priority = "low",
  completed = false,
  id = idCounter++,
  project = "default"
) {
  return {
    id,
    title,
    description,
    dueDate,
    priority,
    completed,
    toggleComplete() {
      this.completed = !this.completed;
    },
    project,
  };
}

export function resetIdCounter(todos) {
  idCounter = Math.max(...todos.map((t) => t.id), 0) + 1;
}
