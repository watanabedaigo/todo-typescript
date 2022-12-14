import React from 'react';
import styles from './styles.module.scss';

// 型エイリアス
// InputFormの型
type InputFormProps = {
  placeholder: string;
  inputAddRef?: React.MutableRefObject<HTMLInputElement>;
  inputSearchRef?: React.MutableRefObject<HTMLInputElement>;
};

// メモ化して。親コンポーネントレンダリングによる再レンダリング防止
const InputForm: React.FC<InputFormProps> = React.memo(
  ({ placeholder, inputAddRef, inputSearchRef }) => {
    console.log('InputForm レンダリング');

    return (
      <input
        type="text"
        placeholder={placeholder}
        ref={inputAddRef ? inputAddRef : inputSearchRef}
      />
    );
  }
);

export default InputForm;
