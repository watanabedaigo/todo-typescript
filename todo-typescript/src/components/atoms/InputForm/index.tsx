import React from 'react';
import { EventType } from 'types/EventType';
import styles from './styles.module.scss';

// 型エイリアス
// InputFormの型
type InputFormProps = {
  placeholder: string;
  inputRef?: React.MutableRefObject<HTMLInputElement>;
  inputSearchRef?: React.MutableRefObject<HTMLInputElement>;
  initValue?: string;
  getInputValue: (event: EventType) => void;
};

// メモ化して。親コンポーネントレンダリングによる再レンダリング防止
const InputForm: React.FC<InputFormProps> = React.memo(
  ({ placeholder, inputRef, inputSearchRef, initValue, getInputValue }) => {
    console.log('InputForm レンダリング');

    return (
      <input
        type="text"
        placeholder={placeholder}
        ref={inputRef ? inputRef : inputSearchRef}
        defaultValue={initValue}
        onChange={getInputValue}
      />
    );
  }
);

export default InputForm;
