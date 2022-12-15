import React, { useCallback, useRef } from 'react';
import { EventType } from 'types/EventType';
import styles from './styles.module.scss';
import Button from 'components/atoms/Button';
import InputForm from 'components/atoms/InputForm';

// 型エイリアス
// Addの型
type AddProps = {
  inputRef: React.MutableRefObject<HTMLInputElement>;
  callback: (event: EventType) => void;
  label: string;
  initValue?: string;
};

// メモ化して。親コンポーネントレンダリングによる再レンダリング防止
const Add: React.FC<AddProps> = React.memo(
  ({ inputRef, callback, label, initValue }) => {
    console.log('Add レンダリング');

    return (
      <div>
        <InputForm
          placeholder="todoを入力"
          inputRef={inputRef}
          initValue={initValue}
        />
        <Button label={label} callback={callback} isRouter={true} />
        <p>to TodoPage</p>
      </div>
    );
  }
);

export default Add;
