import React, { useCallback, useRef } from 'react';
import styles from './styles.module.scss';
import Button from 'components/atoms/Button';
import InputForm from 'components/atoms/InputForm';

// 型エイリアス
// Buttonの型
type SearchProps = {};

// メモ化して。親コンポーネントレンダリングによる再レンダリング防止
const Search: React.FC<SearchProps> = React.memo(({}) => {
  console.log('Search レンダリング');

  // useRef
  const inputRef = useRef<HTMLInputElement>(null!);

  // コールバック関数
  // propsで渡すためメモ化
  const searchTodo = useCallback(() => {
    const value = inputRef.current.value;
  }, []);

  return (
    <div>
      <InputForm placeholder="todoを入力" inputRef={inputRef} />
      <Button value="追加" callback={searchTodo} />
    </div>
  );
});

export default Search;
