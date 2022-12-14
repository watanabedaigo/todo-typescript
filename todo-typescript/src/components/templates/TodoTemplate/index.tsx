import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './styles.module.scss';
import { TodoType } from 'types/TodoType';
import { getTodo } from 'apis/todos';
import Add from 'components/modules/Add';
import Search from 'components/modules/Search';
import List from 'components/modules/List';

const TodoTemplate: React.FC = () => {
  console.log('TodoTemplate レンダリング');

  // useState
  // 表示するtodoを扱うstate。配列で、中身は型エイリアスTodoを型に持つオブジェクト
  const [todos, setTodos] = useState<TodoType[]>([]);
  // 初期取得時のtodoを扱うstate。配列で、中身は型エイリアスTodoを型に持つオブジェクト
  const [initialTodos, setInitialTodos] = useState<TodoType[]>([]);

  // useEffect
  // 依存配列は空なので、初回レンダリング後に実行される
  useEffect(() => {
    // クリーンアップ関数
    let unmounted = false;

    // データ取得の関数
    const fetchData = async () => {
      getTodo()
        .then((todosData) => {
          if (!unmounted) {
            setTodos([...todosData]);
            setInitialTodos([...todosData]);
          }
        })
        .catch((Error) => {
          console.error(Error);
        });
    };
    fetchData();

    return () => {
      unmounted = true;
    };
  }, []);

  return (
    <div>
      <Add todos={todos} setTodos={setTodos} />
      <Search todos={todos} setTodos={setTodos} initialTodos={initialTodos} />
      <List todos={todos} />
    </div>
  );
};

export default TodoTemplate;
