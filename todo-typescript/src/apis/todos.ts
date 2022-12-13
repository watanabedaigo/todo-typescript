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

// DELETE
