// import {useState} from "react";
import TextInputWithLabel from "../../../shared/TextInputWithLabel.jsx";
import {isValidTodoTitle} from "../../../utils/todoValidation.js";
import {useEditableTitle} from "../../../hooks/useEditableTitle";

function TodoListItem({onUpdateTodo, todo, onCompleteTodo}) {
  const {
    isEditing,
    workingTitle,
    startEditing,
    cancelEdit,
    updateTitle,
    finishEdit
  } = useEditableTitle(todo.title);
  return (
    <li>
      <form
        onSubmit={(event) => {
          if (!isEditing) return;
          event.preventDefault();
          const finalTitle = finishEdit();
          onUpdateTodo({...todo, title: finalTitle});
        }}
      >
        {isEditing ? (
          <>
            <TextInputWithLabel
              value={workingTitle}
              onChange={(event) => updateTitle(event.target.value)}
            />
            <button type="button" onClick={cancelEdit}>
              Cancel
            </button>
            <button
              type="button"
              onClick={(event) => {
                if (!isEditing) return;
                event.preventDefault();
                const finalTitle = finishEdit();
                onUpdateTodo({...todo, title: finalTitle});
              }}
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
            <span onClick={startEditing}>{todo.title}</span>
          </>
        )}
      </form>
    </li>
  );
}

export default TodoListItem;
