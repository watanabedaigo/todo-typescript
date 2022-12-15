import React, { useCallback, useRef } from 'react';
import styles from './styles.module.scss';
import Button from 'components/atoms/Button';
import InputForm from 'components/atoms/InputForm';

// 型エイリアス
// Searchの型
type SearchProps = {
  inputSearchRef: React.MutableRefObject<HTMLInputElement>;
  searchTodo: any;
  resetTodo: any;
};

// メモ化して。親コンポーネントレンダリングによる再レンダリング防止
const Search: React.FC<SearchProps> = React.memo(
  ({ inputSearchRef, searchTodo, resetTodo }) => {
    console.log('Search レンダリング');

    return (
      <div>
        <InputForm placeholder="todoを検索" inputSearchRef={inputSearchRef} />
        <Button label="検索" callback={searchTodo} />
        <Button label="条件クリア" callback={resetTodo} />
      </div>
    );
  }
);

export default Search;
