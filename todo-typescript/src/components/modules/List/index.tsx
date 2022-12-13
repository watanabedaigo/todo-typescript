import React, { useEffect, useContext } from 'react';
import styles from './styles.module.scss';
import { TodoType } from 'types/TodoType';
import { getTodo } from 'apis/todos';
import { TodosContext } from 'providers/TodoTemplateProvider';

// メモ化して。親コンポーネントレンダリングによる再レンダリング防止
const List: React.FC = React.memo(() => {
  console.log('List レンダリング');

  // useContext
  const { todos, setTodos } = useContext(TodosContext);

  // // useEffect
  // // 依存配列は空なので、初回レンダリング後に実行される
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
    <ul>
      {todos.map((todo: TodoType) => {
        return (
          <li key={todo.id}>
            <p>{todo.content}</p>
          </li>
        );
      })}
    </ul>
  );
});

export default List;
