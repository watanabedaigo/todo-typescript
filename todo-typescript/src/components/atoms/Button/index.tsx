import React from 'react';
import { EventType } from 'types/EventType';
import styles from './styles.module.scss';

// 型エイリアス
// Buttonの型
type ButtonProps = {
  label: string;
  callback?: (event: EventType) => void;
};

// メモ化して。親コンポーネントレンダリングによる再レンダリング防止
const Button: React.FC<ButtonProps> = React.memo(({ label, callback }) => {
  console.log(`Button ${label} レンダリング`);

  return <button onClick={callback}>{label}</button>;
});

export default Button;
