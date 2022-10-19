import { AxiosResponse } from "axios";
import { TodoType } from "types";
import { getLocalStorage } from "utils";
import { instance } from "./base";

export const getTodos = (): Promise<AxiosResponse<TodoType[], any>> => {
  return instance.get("todos", {
    headers: {
      Authorization: `Bearer ${getLocalStorage("jwt")}`,
    },
  });
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
  return instance.put(
    `/todos/${id}`,
    { todo, isCompleted },
    {
      headers: {
        Authorization: `Bearer ${getLocalStorage("jwt")}`,
      },
    }
  );
};

export const deleteTodo = (id: TodoType["id"]) => {
  return instance.delete(`todos/${id}`, {
    headers: {
      Authorization: `Bearer ${getLocalStorage("jwt")}`,
    },
  });
};

export const createTodo = (
  todo: TodoType["todo"]
): Promise<AxiosResponse<TodoType, any>> => {
  return instance.post(
    "/todos",
    { todo },
    {
      headers: {
        Authorization: `Bearer ${getLocalStorage("jwt")}`,
      },
    }
  );
};
