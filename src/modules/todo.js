export function createTodo(
  title,
  description = "",
  dueDate = "",
  priority = "low",
  completed = false
) {
  return {
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
