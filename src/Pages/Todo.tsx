import React, { useEffect, useState } from "react";
import { createTodo, deleteTodo, getTodos, updateTodo } from "api/todo";
import TodoForm from "components/TodoForm";
import TodoList from "components/TodoList";
import { useInput } from "Hooks/useInput";
import { TodoType } from "types";
import axios from "axios";

const Todo = () => {
  const [todoList, setTodoList] = useState<TodoType[]>([]);
  const {
    props: { value: todoValue, onChange: todoOnchange },
    clearInput,
  } = useInput({ initialValue: "" });

  const handleCreateTodo = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    try {
      const { data: newTodo } = await createTodo(todoValue);
      setTodoList((prev) => [...prev, newTodo]);
      clearInput();
    } catch (error) {
      if (axios.isAxiosError(error)) {
        window.alert(error.response?.statusText);
      }
    }
  };

  const handleDeleteTodo = async (id: TodoType["id"]) => {
    try {
      await deleteTodo(id);
      setTodoList((prev) => prev.filter((cur) => cur.id !== id));
    } catch (error) {
      if (axios.isAxiosError(error)) {
        window.alert(error.response?.statusText);
      }
    }
  };

  const handleToggleTodo = async ({
    id,
    todo,
    isCompleted,
  }: {
    id: TodoType["id"];
    todo: TodoType["todo"];
    isCompleted: TodoType["isCompleted"];
  }) => {
    try {
      const nextTodo = todoList.map((todo) => {
        if (todo.id === id) {
          return { ...todo, isCompleted: !todo.isCompleted };
        }
        return todo;
      });

      await updateTodo({
        id,
        todo,
        isCompleted: !isCompleted,
      });
      setTodoList(nextTodo);
    } catch (error) {
      if (axios.isAxiosError(error)) {
        window.alert(error.response?.statusText);
      }
    }
  };

  const handleEdittingTodo = async ({
    id,
    todo,
    isCompleted,
  }: {
    id: TodoType["id"];
    todo: TodoType["todo"];
    isCompleted: TodoType["isCompleted"];
  }) => {
    const { data } = await updateTodo({ id, todo, isCompleted });

    const nextTodo = todoList.map((todoItem) => {
      if (todoItem.id === id) return data;
      else return todoItem;
    });

    setTodoList(nextTodo);
  };

  useEffect(() => {
    const initTodo = async () => {
      const { data } = await getTodos();
      setTodoList(data);
    };
    initTodo();
  }, []);

  return (
    <div className="wrapper">
      <header>
        <h1>TODO List</h1>
      </header>
      <div>
        <TodoForm
          todoInput={{ value: todoValue, onChange: todoOnchange }}
          handleCreateTodo={handleCreateTodo}
        />
        <TodoList
          todoList={todoList}
          handleDeleteTodo={handleDeleteTodo}
          handleToggleTodo={handleToggleTodo}
          handleEdittingTodo={handleEdittingTodo}
        />
      </div>
    </div>
  );
};
export default Todo;
