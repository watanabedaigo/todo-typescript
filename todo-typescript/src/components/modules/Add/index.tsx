import React, { useCallback, useRef, useContext } from 'react';
import styles from './styles.module.scss';
import { TodoType } from 'types/TodoType';
import { postTodo } from 'apis/todos';
import { ulid } from 'ulid';
import Button from 'components/atoms/Button';
import InputForm from 'components/atoms/InputForm';
import { TodosContext } from 'providers/TodoTemplateProvider';

// メモ化して。親コンポーネントレンダリングによる再レンダリング防止
const Add: React.FC = React.memo(() => {
  console.log('Add レンダリング');

  // useContext
  const { todos, setTodos } = useContext(TodosContext);

  // useRef
  const inputRef = useRef<HTMLInputElement>(null!);

  // コールバック関数
  // propsで渡すためメモ化、依存配列にstate指定しているためメモ化意味なし？
  const addTodo = useCallback(() => {
    const value = inputRef.current.value;
    const newTodo: TodoType = {
      id: ulid(),
      content: value,
      done: false,
    };

    postTodo(newTodo)
      .then((newTodo) => {
        setTodos([...todos, newTodo]);
      })
      .catch((Error) => {
        console.error(Error);
      });
  }, [todos]);

  return (
    <div>
      <InputForm placeholder="todoを入力" inputRef={inputRef} />
      <Button value="追加" callback={addTodo} />
    </div>
  );
});

export default Add;
