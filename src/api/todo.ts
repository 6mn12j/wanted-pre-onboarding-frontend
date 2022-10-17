import { TodoType } from "types";
import { instance } from "./base";

export const getTodos = () => {
  return instance.get("todos");
};

export const updateTodo = (id: Pick<TodoType, "id">) => {
  return instance.put(`/todos:${id}`);
};

export const deleteTodo = (id: Pick<TodoType, "id">) => {
  return instance.delete(`todos/${id}`);
};

export const createTodo = (todo: TodoType) => {
  return instance.post("/todos", todo);
};
