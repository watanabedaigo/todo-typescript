import React, { useCallback, useRef } from 'react';
import { EventType } from 'types/EventType';
import styles from './styles.module.scss';
import { Link } from 'react-router-dom';
import Button from 'components/atoms/Button';
import InputForm from 'components/atoms/InputForm';

// 型エイリアス
// Addの型
type AddProps = {
  inputRef: React.MutableRefObject<HTMLInputElement>;
  callback: (event: EventType) => void;
  label: string;
  initValue?: string;
  getInputValue: (event: EventType) => void;
};

// メモ化して。親コンポーネントレンダリングによる再レンダリング防止
const Add: React.FC<AddProps> = React.memo(
  ({ inputRef, callback, label, initValue, getInputValue }) => {
    console.log('Add レンダリング');

    return (
      <div>
        <InputForm
          placeholder="todoを入力"
          inputRef={inputRef}
          initValue={initValue}
          getInputValue={getInputValue}
        />
        <Button label={label} callback={callback} isRouter={true} />
        <Link to={'/'}>トップ</Link>
      </div>
    );
  }
);

export default Add;
