import React from 'react';
import styles from './styles.module.scss';

// 型エイリアス
// Buttonの型
type ButtonProps = {
  value: string;
  callback: () => void;
};

// メモ化して。親コンポーネントレンダリングによる再レンダリング防止
const Button: React.FC<ButtonProps> = React.memo(({ value, callback }) => {
  console.log('Button レンダリング');

  return <button onClick={callback}>{value}</button>;
});

export default Button;
