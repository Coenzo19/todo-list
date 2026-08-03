import {useRef, useState} from "react";

function TodoForm({onAddTodo}) {
  const inputRef = useRef();
  const [workingTodoTitle, setWorkingTodoTitle] = useState("");

  const handleAddTodo = (event) => {
    event.preventDefault();

    console.log("event object:", event);
    console.log("event target:", event.target);
    console.log("Input value:", event.target.todoTitle.value);

    //const todoTitle = event.target.todoTitle.value.trim();

    onAddTodo(workingTodoTitle);
    setWorkingTodoTitle("");
    //event.target.reset();
    inputRef.current.focus();
  };

  return (
    <form onSubmit={handleAddTodo}>
      <label htmlFor="todoTitle">Todo</label>
      <input
        value={workingTodoTitle}
        onChange={(e) => setWorkingTodoTitle(e.target.value)}
        ref={inputRef}
        type="text"
        id="todoTitle"
        name="todoTitle"
        placeholder={"Todo text"}
        required
      />
      <button type="submit" disabled={!workingTodoTitle.trim()}>
        Add Todo
      </button>
    </form>
  );
}

export default TodoForm;
