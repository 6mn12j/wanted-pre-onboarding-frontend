import { AxiosResponse } from "axios";
import { TodoType } from "types";
import { instance } from "./base";

export const getTodos = (): Promise<AxiosResponse<TodoType[], any>> => {
  return instance.get("todos");
};

export const updateTodo = ({
  id,
  todo,
  isCompleted,
}: {
  id: TodoType["id"];
  todo: TodoType["todo"];
  isCompleted: TodoType["isCompleted"];
}) => {
  return instance.put(`/todos/${id}`, { todo, isCompleted });
};

export const deleteTodo = (id: TodoType["id"]) => {
  return instance.delete(`todos/${id}`);
};

export const createTodo = (
  todo: TodoType["todo"]
): Promise<AxiosResponse<TodoType, any>> => {
  return instance.post("/todos", { todo });
};
