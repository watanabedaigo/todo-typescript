import React from 'react';
import styles from './styles.module.scss';

// 型エイリアス
// InputFormの型
type InputFormProps = {
  placeholder: string;
  inputRef?: React.MutableRefObject<HTMLInputElement>;
  inputSearchRef?: React.MutableRefObject<HTMLInputElement>;
  initValue?: string;
};

// メモ化して。親コンポーネントレンダリングによる再レンダリング防止
const InputForm: React.FC<InputFormProps> = React.memo(
  ({ placeholder, inputRef, inputSearchRef, initValue }) => {
    console.log('InputForm レンダリング');

    return (
      <input
        type="text"
        placeholder={placeholder}
        ref={inputRef ? inputRef : inputSearchRef}
        defaultValue={initValue}
      />
    );
  }
);

export default InputForm;
