import React, { useEffect, useState, createContext } from 'react';
import axios from 'axios';
import styles from './styles.module.scss';
import { TodoType } from 'types/TodoType';
import { getTodo } from 'apis/todos';
import Add from 'components/modules/Add';

const TodoTemplate: React.FC = () => {
  // useState
  // todoを扱うstate。配列で、中身は型エイリアスTodoを型に持つオブジェクト
  const [todos, setTodos] = useState<TodoType[]>([]);

  // データ取得の関数
  const fetchData = async () => {
    getTodo()
      .then((todosData) => {
        setTodos([...todosData]);
      })
      .catch((Error) => {
        console.error(Error);
      });
  };

  // useEffect
  // 依存配列は空なので、初回レンダリング後に実行される
  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div>
      <Add todos={todos} setTodos={setTodos} />
      <ul>
        {todos.map((todo: TodoType) => {
          return (
            <li key={todo.id}>
              <p>{todo.content}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default TodoTemplate;
