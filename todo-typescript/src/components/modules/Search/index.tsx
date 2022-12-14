import React, { useCallback, useRef } from 'react';
import styles from './styles.module.scss';
import { TodoType } from 'types/TodoType';
import { postTodo } from 'apis/todos';
import { ulid } from 'ulid';
import Button from 'components/atoms/Button';
import InputForm from 'components/atoms/InputForm';

// 型エイリアス
// Searchの型
type SearchProps = {
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
  initialTodos: TodoType[];
};

// メモ化して。親コンポーネントレンダリングによる再レンダリング防止
const Search: React.FC<SearchProps> = React.memo(
  ({ todos, setTodos, initialTodos }) => {
    console.log('Search レンダリング');

    // useRef
    const inputRef = useRef<HTMLInputElement>(null!);

    // コールバック関数
    // propsで渡すためメモ化、useCallbackの依存配列にstate指定しているためメモ化意味なし？
    const searchTodo = () => {
      // 入力値取得
      let value = inputRef.current.value;

      // 検索ワードを含むもののみ、todosから抽出
      const targetTodos = todos.filter((todo) => {
        return todo.content.indexOf(value) !== -1;
      });

      // State更新
      setTodos([...targetTodos]);

      // input初期化
      inputRef.current.value = '';
    };

    const resetTodo = () => {
      // 表示用のState(todos)を、初期取得時のState(initialTodos)で更新
      setTodos([...initialTodos]);
    };

    return (
      <div>
        <InputForm placeholder="todoを検索" inputRef={inputRef} />
        <Button value="検索" callback={searchTodo} />
        <Button value="条件クリア" callback={resetTodo} />
      </div>
    );
  }
);

export default Search;
