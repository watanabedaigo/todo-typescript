import axios from 'axios';
import { TodoType } from 'types/TodoType';

// APIリクエスト先のURL
const url = 'http://localhost:3000/todos';

// GET
export const getTodo = async () => {
  const response = await axios.get(url);
  const todosData: TodoType[] = response.data;
  return todosData;
};

// POST
export const postTodo = async (newTodo: TodoType) => {
  const response = await axios.post(url, newTodo);
  const newTodoData: TodoType = response.data;
  return newTodoData;
};

// PUT
export const putTodo = async (id: string, targetTodo: TodoType) => {
  const response = await axios.put(`${url}/${id}`, targetTodo);
  const updatedTodo = response.data;
  return updatedTodo;
};

// DELETE
export const deleteTodo = async (id: string) => {
  const response = await axios.delete(`${url}/${id}`);
  const deletedTodo: TodoType = response.data;
  return deletedTodo;
};
