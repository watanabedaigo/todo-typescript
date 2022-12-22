import React from 'react';
import { TodoType } from 'types/TodoType';
import { EventType } from 'types/EventType';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import Button from 'components/atoms/Button';

// 型エイリアス
// Addの型
type ListProps = {
  notDoneTodos: TodoType[];
  doneTodos: TodoType[];
  updateDone: (event: EventType) => void;
  removeTodo: (event: EventType) => void;
};

// メモ化して。親コンポーネントレンダリングによる再レンダリング防止
const List: React.FC<ListProps> = React.memo(
  ({ notDoneTodos, doneTodos, updateDone, removeTodo }) => {
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
                  <Link to={`detail/${todo.id}`}>詳細</Link>
                  <Link
                    to={`edit/${todo.id}`}
                    data-testid={
                      todo.id === '01GMQCGWP9AQQG1X1HRCJ7JE3H' &&
                      'updateContent-test'
                    }
                  >
                    編集
                  </Link>
                  <Button label="削除" callback={removeTodo} />
                  <Button
                    label={todo.done ? '未完了へ' : '完了へ'}
                    callback={updateDone}
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
                  <Link to={`detail/${todo.id}`}>詳細</Link>
                  <Link
                    to={`edit/${todo.id}`}
                    data-testid={
                      todo.id === '01GMQCGWP9AQQG1X1HRCJ7JE3H' &&
                      'updateContent-test'
                    }
                  >
                    編集
                  </Link>
                  <Button label="削除" callback={removeTodo} />
                  <Button
                    label={todo.done ? '未完了へ' : '完了へ'}
                    callback={updateDone}
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
