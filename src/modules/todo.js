let idCounter = 0;
export function createTodo(
  title,
  description = "",
  dueDate = "",
  priority = "low",
  completed = false
) {
  return {
    id: idCounter++,
    title,
    description,
    dueDate,
    priority,
    completed,
    toggleComplete() {
      this.completed = !this.completed;
    },
  };
}
