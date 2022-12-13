import React from 'react';
import styles from './styles.module.scss';

// 型エイリアス
// InputFormの型
type InputFormProps = {
  placeholder: string;
  // 修正：型付け
  inputRef: any;
};

// メモ化して。親コンポーネントレンダリングによる再レンダリング防止
const InputForm: React.FC<InputFormProps> = React.memo(
  ({ placeholder, inputRef }) => {
    console.log('InputForm レンダリング');

    return <input type="text" placeholder={placeholder} ref={inputRef} />;
  }
);

export default InputForm;
