import React from 'react';
import { TodoType } from 'types/TodoType';
import Button from 'components/atoms/Button';
import { Link } from 'react-router-dom';
import { EventType } from 'types/EventType';

// 型エイリアス
// Addの型
type ListProps = {
  notDoneTodos: TodoType[];
  doneTodos: TodoType[];
  toggleDone: (event: EventType) => void;
  removeTodo: (event: EventType) => void;
};

// メモ化して。親コンポーネントレンダリングによる再レンダリング防止
const List: React.FC<ListProps> = React.memo(
  ({ notDoneTodos, doneTodos, toggleDone, removeTodo }) => {
    console.log('List レンダリング');

    return (
      <div>
        <div>
          <p>未完了</p>
          <ul>
            {notDoneTodos.map((todo: TodoType) => {
              return (
                <li key={todo.id} id={todo.id}>
                  <p>{todo.content}</p>
                  <Link to={`detail/${todo.id}`}>
                    <Button value="詳細" />
                  </Link>
                  <Link to={`edit/${todo.id}`}>
                    <Button value="編集" />
                  </Link>
                  <Button value="削除" callback={removeTodo} />
                  <Button
                    value={todo.done ? '未完了へ' : '完了へ'}
                    callback={toggleDone}
                  />
                </li>
              );
            })}
          </ul>
        </div>
        <div>
          <p>完了</p>
          <ul>
            {doneTodos.map((todo: TodoType) => {
              return (
                <li key={todo.id} id={todo.id}>
                  <p>{todo.content}</p>
                  <Link to={`detail/${todo.id}`}>
                    <Button value="詳細" />
                  </Link>
                  <Link to={`edit/${todo.id}`}>
                    <Button value="編集" />
                  </Link>
                  <Button value="削除" callback={removeTodo} />
                  <Button
                    value={todo.done ? '未完了へ' : '完了へ'}
                    callback={toggleDone}
                  />
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    );
  }
);

export default List;
