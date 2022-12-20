import React, { useEffect, useState } from 'react';
import { useTodo } from 'hooks/useTodo';
import { Link } from 'react-router-dom';
import Search from 'components/modules/Search';
import List from 'components/modules/List';

const TodoTemplate: React.FC = () => {
  console.log('TodoTemplate レンダリング');

  // カスタムフックからロジックを受け取る
  const {
    notDoneTodos,
    doneTodos,
    updateDone,
    removeTodo,
    inputSearchRef,
    getInputValue,
    searchTodo,
    resetTodo,
  } = useTodo();

  return (
    <div>
      <p>
        <Link to={'create'}>追加</Link>
      </p>
      <Search
        inputSearchRef={inputSearchRef}
        searchTodo={searchTodo}
        resetTodo={resetTodo}
        getInputValue={getInputValue}
      />
      <List
        notDoneTodos={notDoneTodos}
        doneTodos={doneTodos}
        updateDone={updateDone}
        removeTodo={removeTodo}
      />
    </div>
  );
};

export default TodoTemplate;
