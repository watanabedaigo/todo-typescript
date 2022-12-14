import React, { useCallback, useRef } from 'react';
import styles from './styles.module.scss';
import { TodoType } from 'types/TodoType';
import { postTodo } from 'apis/todos';
import { ulid } from 'ulid';
import Button from 'components/atoms/Button';
import InputForm from 'components/atoms/InputForm';

// 型エイリアス
// Addの型
type AddProps = {
  todos: TodoType[];
  setTodos: React.Dispatch<React.SetStateAction<TodoType[]>>;
};

// メモ化して。親コンポーネントレンダリングによる再レンダリング防止
const Add: React.FC<AddProps> = React.memo(({ todos, setTodos }) => {
  console.log('Add レンダリング');

  // useRef
  const inputRef = useRef<HTMLInputElement>(null!);

  // コールバック関数
  // propsで渡すためメモ化、useCallbackの依存配列にstate指定しているためメモ化意味なし？
  const addTodo = () => {
    // 入力値取得
    let value = inputRef.current.value;

    // 追加データをオブジェクトで作成
    const newTodo: TodoType = {
      id: ulid(),
      content: value,
      done: false,
    };

    // jsonに追加
    postTodo(newTodo)
      .then((newTodo) => {
        // State更新
        setTodos([...todos, newTodo]);

        // input初期化
        inputRef.current.value = '';
      })
      .catch((Error) => {
        console.error(Error);
      });
  };

  return (
    <div>
      <InputForm placeholder="todoを入力" inputRef={inputRef} />
      <Button value="追加" callback={addTodo} />
    </div>
  );
});

export default Add;
