import React from "react";
import { TodoType } from "types";
import { TodoItem } from "./TodoItem";

type TodoListProps = {
  todoList: TodoType[];
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
};

const TodoList = ({
  todoList,
  handleDeleteTodo,
  handleToggleTodo,
  handleEdittingTodo,
}: TodoListProps) => {
  return (
    <ul>
      {todoList &&
        todoList.map((todo) => (
          <TodoItem
            key={todo.id}
            handleDeleteTodo={handleDeleteTodo}
            handleToggleTodo={handleToggleTodo}
            handleEdittingTodo={handleEdittingTodo}
            todoItem={todo}
          />
        ))}
    </ul>
  );
};

export default TodoList;
