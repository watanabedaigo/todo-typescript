import React, { useEffect, useState } from 'react';
import { useTodo } from 'hooks/useTodo';
import Add from 'components/modules/Add';
import Search from 'components/modules/Search';
import List from 'components/modules/List';

const TodoTemplate: React.FC = () => {
  console.log('TodoTemplate レンダリング');

  // カスタムフックからロジックを受け取る
  const {
    notDoneTodos,
    doneTodos,
    inputAddRef,
    addTodo,
    toggleDone,
    removeTodo,
    inputSearchRef,
    searchTodo,
    resetTodo,
  } = useTodo();

  return (
    <div>
      <Add inputAddRef={inputAddRef} addTodo={addTodo} />
      <Search
        inputSearchRef={inputSearchRef}
        searchTodo={searchTodo}
        resetTodo={resetTodo}
      />
      <List
        notDoneTodos={notDoneTodos}
        doneTodos={doneTodos}
        toggleDone={toggleDone}
        removeTodo={removeTodo}
      />
    </div>
  );
};

export default TodoTemplate;
