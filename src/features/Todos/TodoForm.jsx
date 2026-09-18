import {useRef, useState} from "react";
import TextInputWithLabel from "../../shared/TextInputWithLabel.jsx";
import {isValidTodoTitle} from "../../utils/todoValidation";
import classes from "../../classes.module.css";
import {sanitizeText} from "../../utils/sanitizeText";
function TodoForm({onAddTodo}) {
  const inputRef = useRef();
  const [workingTodoTitle, setWorkingTodoTitle] = useState("");
  const [error, setError] = useState("");
  const cleanedInput = sanitizeText(workingTodoTitle);

  const handleAddTodo = (event) => {
    event.preventDefault();
    setError("");
    const validationResult = isValidTodoTitle(cleanedInput);
    if (validationResult === "too-long") {
      setError("task must be 100 characters or less");
    } else if (validationResult === "required") {
      setError("task title is required");
    } else if (validationResult === "invalid-type") {
      setError("task must be text");
    } else {
      onAddTodo(cleanedInput);
      setWorkingTodoTitle("");
      inputRef.current.focus();
    }
  };

  return (
    <>
      <form className={classes["add-todo-container"]} onSubmit={handleAddTodo}>
        <TextInputWithLabel
          classNameText={classes["add-todo-text"]}
          classNameInput={classes["add-todo-input"]}
          ref={inputRef}
          value={workingTodoTitle}
          onChange={(e) => setWorkingTodoTitle(e.target.value)}
          elementId="todoTitle"
          labelText="Todo"
        />

        <button
          className={classes["filter-input"]}
          type="submit"
          disabled={isValidTodoTitle(cleanedInput) !== "valid"}
        >
          Add Todo
        </button>
      </form>

      {error && <p className={classes["error"]}>{error}</p>}
    </>
  );
}

export default TodoForm;
