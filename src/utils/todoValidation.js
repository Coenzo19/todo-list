export function isValidTodoTitle(title) {

  if (typeof title !== "string") {
    return "invalid-type";
  }
  if (title.trim().length > 100) {
    return "too-long";
  }
  if (title.trim().length < 1) {
    return 'required';
  }
  return 'valid'
}

