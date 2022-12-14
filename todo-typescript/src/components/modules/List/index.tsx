import React, { useCallback } from 'react';
import { TodoType } from 'types/TodoType';
import { deleteTodo } from 'apis/todos';
import Button from 'components/atoms/Button';

// 型エイリアス
// Addの型
type ListProps = {
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
};

// メモ化して。親コンポーネントレンダリングによる再レンダリング防止
const List: React.FC<ListProps> = React.memo(({ todos, setTodos }) => {
  console.log('List レンダリング');

  // コールバック関数
  // propsで渡すためメモ化、useCallbackの依存配列にstate指定しているためメモ化意味なし？
  const removeTodo = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      // ターゲットDOM取得
      const target = event.currentTarget.closest('li');

      // ターゲット取得後の処理
      if (target !== null) {
        // DOMから削除
        target.remove();

        // jsonから削除
        const targetId: string = target.getAttribute('id') as string;
        deleteTodo(targetId);
      }
    },
    []
  );

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
