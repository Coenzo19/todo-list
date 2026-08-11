import {useState} from "react";
import TextInputWithLabel from "/src/shared/TextInputWithLabel.jsx";
import {isValidTodoTitle} from "/src/utils/todoValidation.js";
import {useEditableTitle} from "/src/hooks/useEditableTitle.js";

function TodoListItem({onUpdateTodo, todo, onCompleteTodo}) {
  const [isEditing, setIsEditing] = useState(false);
  const [workingTitle, setWorkingTitle] = useState(todo.title);

  function handleCancel() {
    setWorkingTitle(todo.title);
    setIsEditing(false);
  }

  function handleEdit(e) {
    setWorkingTitle(e.target.value);
  }
  function handleUpdate(e) {
    if (!isEditing) {
      return;
    }
    e.preventDefault();

    const updatedTodo = {
      id: todo.id,
      title: workingTitle,
      isCompleted: todo.isCompleted
    };

    onUpdateTodo(updatedTodo);
    setIsEditing(false);
  }

  return (
    <li>
      <form onSubmit={handleUpdate}>
        {isEditing ? (
          <>
            <TextInputWithLabel value={workingTitle} onChange={handleEdit} />
            <button type="button" onClick={handleCancel}>
              Cancel
            </button>
            <button
              type="button"
              onClick={handleUpdate}
              disabled={!isValidTodoTitle(workingTitle)}
            >
              Update
            </button>
          </>
        ) : (
          <>
            <label>
              <input
                type="checkbox"
                checked={todo.isCompleted}
                onChange={() => onCompleteTodo(todo.id)}
              />
            </label>
            <span onClick={() => setIsEditing(true)}>{todo.title}</span>
          </>
        )}
      </form>
    </li>
  );
}

export default TodoListItem;
