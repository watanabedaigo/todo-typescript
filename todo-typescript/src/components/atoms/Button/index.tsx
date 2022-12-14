import React from 'react';
import styles from './styles.module.scss';
import { EventType } from 'types/EventType';

// 型エイリアス
// Buttonの型
type ButtonProps = {
  value: string;
  callback: (event: EventType) => void;
};

// メモ化して。親コンポーネントレンダリングによる再レンダリング防止
const Button: React.FC<ButtonProps> = React.memo(({ value, callback }) => {
  console.log(`Button ${value} レンダリング`);

  return <button onClick={callback}>{value}</button>;
});

export default Button;
