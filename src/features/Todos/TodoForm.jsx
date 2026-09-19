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
      setError("Task must be 100 characters or less");
      return;
    } else if (validationResult === "required") {
      setError("Task title is required");
      return;
    } else if (validationResult === "invalid-type") {
      setError("Task must be text");
      return;
    } else {
      onAddTodo(cleanedInput);
      setWorkingTodoTitle("");
      inputRef.current.focus();
    }
  };

  return (
    <>
      <form className={classes["add-todo"]} onSubmit={handleAddTodo}>
        <TextInputWithLabel
          classNameText={classes["filters-text"]}
          classNameInput={classes["filters-input"]}
          ref={inputRef}
          value={workingTodoTitle}
          onChange={(e) => setWorkingTodoTitle(e.target.value)}
          elementId="todoTitle"
          labelText="Todo"
        />
        <button className={classes["filters-input"]} type="submit">
          Add Todo
        </button>
      </form>

      {error && <p className={classes["error"]}>{error}</p>}
    </>
  );
}

export default TodoForm;
