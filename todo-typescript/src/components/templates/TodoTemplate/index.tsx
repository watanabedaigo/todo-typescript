import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './styles.module.scss';
import { TodoType } from 'types/TodoType';
import { getTodo } from 'apis/todos';
import Add from 'components/modules/Add';
import List from 'components/atoms/List';

const TodoTemplate: React.FC = () => {
  console.log('TodoTemplate レンダリング');

  // useState
  // todoを扱うstate。配列で、中身は型エイリアスTodoを型に持つオブジェクト
  const [todos, setTodos] = useState<TodoType[]>([]);

  // useEffect
  // 依存配列は空なので、初回レンダリング後に実行される
  useEffect(() => {
    // クリーンアップ関数
    let unmounted = false;

    // データ取得の関数;
    const fetchData = async () => {
      getTodo()
        .then((todosData) => {
          if (!unmounted) {
            setTodos([...todosData]);
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
      <List todos={todos} setTodos={setTodos} />
    </div>
  );
};

export default TodoTemplate;
