import { useInput } from "Hooks/useInput";
import React, { useState } from "react";
import { TodoType } from "types";

type TodoItemProps = {
  handleDeleteTodo: (id: TodoType["id"]) => Promise<void>;
  handleToggleTodo: ({
    id,
    todo,
    isCompleted,
  }: {
    id: TodoType["id"];
    todo: TodoType["todo"];
    isCompleted: TodoType["isCompleted"];
  }) => Promise<void>;
  handleEdittingTodo: ({
    id,
    todo,
    isCompleted,
  }: {
    id: TodoType["id"];
    todo: TodoType["todo"];
    isCompleted: TodoType["isCompleted"];
  }) => Promise<void>;
  todoItem: TodoType;
};

const TodoItem = ({
  todoItem,
  handleDeleteTodo,
  handleToggleTodo,
  handleEdittingTodo,
}: TodoItemProps) => {
  const {
    props: { value: editValue, onChange: editOnChange },
  } = useInput({ initialValue: todoItem.todo });
  const [mode, setMode] = useState("view");
  const { id, todo, isCompleted } = todoItem;

  const handleDestroy = () => {
    handleDeleteTodo(id);
  };

  const onEdit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await handleEdittingTodo({ id, todo: editValue, isCompleted });
    toggleMode();
  };

  const toggleMode = () => {
    setMode((prev) => (prev === "view" ? "editing" : "view"));
  };

  return (
    <li key={id}>
      <div className="view" hidden={mode !== "view"}>
        <input
          className="toggle"
          type="checkbox"
          defaultChecked={isCompleted}
          onChange={() => handleToggleTodo({ id, todo, isCompleted })}
        />
        <label className="label">{todo}</label>
        <button onClick={toggleMode}>수정</button>
        <button onClick={handleDestroy} className="destroy">
          삭제
        </button>
      </div>

      <div className="edit" hidden={mode !== "editing"}>
        <form onSubmit={onEdit}>
          <input className="edit" value={editValue} onChange={editOnChange} />
          <button onClick={toggleMode} type="button">
            취소
          </button>
          <button type="submit">수정완료</button>
        </form>
      </div>
    </li>
  );
};

export { TodoItem };
