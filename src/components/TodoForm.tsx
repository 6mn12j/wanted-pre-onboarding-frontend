import React from "react";
import { useInput } from "Hooks/useInput";

type TodoFormProps = {
  todoInput: ReturnType<typeof useInput>["props"];
  handleCreateTodo: (event: React.FormEvent<HTMLFormElement>) => Promise<void>;
};

const TodoForm = ({ todoInput, handleCreateTodo }: TodoFormProps) => {
  return (
    <div>
      <form onSubmit={handleCreateTodo}>
        <input {...todoInput} placeholder="할 일을 추가해 주세요" />
        <button type="submit">추가</button>
      </form>
    </div>
  );
};

export default TodoForm;
