import React, { useCallback, useRef } from 'react';
import styles from './styles.module.scss';
import Button from 'components/atoms/Button';
import InputForm from 'components/atoms/InputForm';
import { Link } from 'react-router-dom';
import { EventType } from 'types/EventType';

// 型エイリアス
// Addの型
type AddProps = {
  inputAddRef: React.MutableRefObject<HTMLInputElement>;
  addTodo: (event: EventType) => void;
  placeholder: string;
  value: string;
};

// メモ化して。親コンポーネントレンダリングによる再レンダリング防止
const Add: React.FC<AddProps> = React.memo(
  ({ inputAddRef, addTodo, placeholder, value }) => {
    console.log('Add レンダリング');

    return (
      <div>
        <InputForm placeholder={placeholder} inputAddRef={inputAddRef} />
        <Link to={'/'}>
          <Button value={value} callback={addTodo} />
        </Link>
        <p>
          <Link to={'/'}>to TodoPage</Link>
        </p>
      </div>
    );
  }
);

export default Add;
