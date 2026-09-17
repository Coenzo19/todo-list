// import {useState} from "react";
import TextInputWithLabel from "../../../shared/TextInputWithLabel.jsx";
import {isValidTodoTitle} from "../../../utils/todoValidation.js";
import {useEditableTitle} from "../../../hooks/useEditableTitle";
import classes from "../../../classes.module.css";

function TodoListItem({onUpdateTodo, todo, onCompleteTodo, deleteTodo, index}) {
  const {
    isEditing,
    workingTitle,
    startEditing,
    cancelEdit,
    updateTitle,
    finishEdit
  } = useEditableTitle(todo.title);
  return (
    <li className={classes["todo-item"]}>
      <form
        onSubmit={(event) => {
          if (!isEditing) return;
          event.preventDefault();
          const finalTitle = finishEdit();
          onUpdateTodo({...todo, title: finalTitle});
        }}
      >
        {isEditing ? (
          <div className={classes["editing-container"]}>
            <TextInputWithLabel
              classNameInput={classes["editing-input"]}
              value={workingTitle}
              onChange={(event) => updateTitle(event.target.value)}
            />
            {workingTitle.length > 100 && (
              <p className={classes["error"]}>
                Your task has exceeded the maximum character limit
              </p>
            )}
            <div className={classes["editing-btn-container"]}>
              <button
                className={classes["editing-btn"]}
                type="button"
                onClick={cancelEdit}
              >
                Cancel
              </button>
              <button
                className={classes["editing-btn"]}
                type="button"
                onClick={() => deleteTodo(todo, index)}
              >
                Delete
              </button>
              <button
                className={classes["editing-btn"]}
                type="button"
                onClick={(event) => {
                  if (!isEditing) return;
                  event.preventDefault();
                  const finalTitle = finishEdit();
                  onUpdateTodo({...todo, title: finalTitle});
                }}
                disabled={
                  !isValidTodoTitle(workingTitle) || workingTitle.length > 100
                }
              >
                Update
              </button>
            </div>
          </div>
        ) : (
          <>
            <label>
              <input
                className={classes["checkbox"]}
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
