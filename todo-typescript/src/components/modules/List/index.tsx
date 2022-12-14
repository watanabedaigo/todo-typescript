import React, { useCallback } from 'react';
import { TodoType } from 'types/TodoType';
import { deleteTodo } from 'apis/todos';
import { useTodo } from 'hooks/useTodo';
import Button from 'components/atoms/Button';

// 型エイリアス
// Addの型
type ListProps = {
  todos: TodoType[];
  removeTodo: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

// メモ化して。親コンポーネントレンダリングによる再レンダリング防止
const List: React.FC<ListProps> = React.memo(({ todos, removeTodo }) => {
  console.log('List レンダリング');

  return (
    <ul>
      {todos.map((todo: TodoType) => {
        return (
          <li key={todo.id} id={todo.id}>
            <p>{todo.content}</p>
            <Button value="削除" callback={removeTodo} />
          </li>
        );
      })}
    </ul>
  );
});

export default List;
