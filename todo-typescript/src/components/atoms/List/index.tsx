import React from 'react';
import { TodoType } from 'types/TodoType';

// 型エイリアス
// Addの型
type ListProps = {
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
};

// メモ化して。親コンポーネントレンダリングによる再レンダリング防止
const List: React.FC<ListProps> = React.memo(({ todos, setTodos }) => {
  console.log('List レンダリング');

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
