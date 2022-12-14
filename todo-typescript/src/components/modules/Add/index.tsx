import React, { useCallback, useRef } from 'react';
import styles from './styles.module.scss';
import { TodoType } from 'types/TodoType';
import { postTodo } from 'apis/todos';
import { ulid } from 'ulid';
import { useTodo } from 'hooks/useTodo';
import Button from 'components/atoms/Button';
import InputForm from 'components/atoms/InputForm';

// 型エイリアス
// Addの型
type AddProps = {
  inputAddRef: React.MutableRefObject<HTMLInputElement>;
  addTodo: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
};

// メモ化して。親コンポーネントレンダリングによる再レンダリング防止
const Add: React.FC<AddProps> = React.memo(({ inputAddRef, addTodo }) => {
  console.log('Add レンダリング');

  return (
    <div>
      <InputForm placeholder="todoを入力" inputAddRef={inputAddRef} />
      <Button value="追加" callback={addTodo} />
    </div>
  );
});

export default Add;
