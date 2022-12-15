import React from 'react';
import { EventType } from 'types/EventType';
import { Link } from 'react-router-dom';
import styles from './styles.module.scss';

// 型エイリアス
// Buttonの型
type ButtonProps = {
  label: string;
  callback?: (event: EventType) => void;
  isRouter?: boolean;
};

// メモ化して。親コンポーネントレンダリングによる再レンダリング防止
const Button: React.FC<ButtonProps> = React.memo(
  ({ label, callback, isRouter }) => {
    console.log(`Button ${label} レンダリング`);

    return (
      <div>
        {isRouter === true ? (
          <Link to={'/'} onClick={callback}>
            {label}
          </Link>
        ) : (
          <button onClick={callback}>{label}</button>
        )}
      </div>
    );
  }
);

export default Button;
