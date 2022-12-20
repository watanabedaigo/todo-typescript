import React, { useCallback, useRef } from 'react';
import { EventType } from 'types/EventType';
import styles from './styles.module.scss';
import Button from 'components/atoms/Button';
import InputForm from 'components/atoms/InputForm';

// 型エイリアス
// Searchの型
type SearchProps = {
  inputSearchRef: React.MutableRefObject<HTMLInputElement>;
  searchTodo: any;
  resetTodo: any;
  getInputValue: (event: EventType) => void;
};

// メモ化して。親コンポーネントレンダリングによる再レンダリング防止
const Search: React.FC<SearchProps> = React.memo(
  ({ inputSearchRef, searchTodo, resetTodo, getInputValue }) => {
    console.log('Search レンダリング');

    return (
      <div>
        <InputForm
          placeholder="todoを検索"
          inputSearchRef={inputSearchRef}
          getInputValue={getInputValue}
        />
        <Button label="検索" callback={searchTodo} isRouter={false} />
        <Button label="条件クリア" callback={resetTodo} isRouter={false} />
      </div>
    );
  }
);

export default Search;
