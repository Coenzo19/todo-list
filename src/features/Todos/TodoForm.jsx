import {useRef, useState} from "react";
import TextInputWithLabel from "../../shared/TextInputWithLabel.jsx";
import {isValidTodoTitle} from "../../utils/todoValidation";
import classes from "../../classes.module.css";

function TodoForm({onAddTodo}) {
  const inputRef = useRef();
  const [workingTodoTitle, setWorkingTodoTitle] = useState("");

  const handleAddTodo = (event) => {
    event.preventDefault();

    onAddTodo(workingTodoTitle);
    setWorkingTodoTitle("");
    inputRef.current.focus();
  };

  return (
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
      <button className={classes["filter-input"]} type="submit" disabled={!isValidTodoTitle(workingTodoTitle)}>
        Add Todo
      </button>
    </form>
  );
}

export default TodoForm;
