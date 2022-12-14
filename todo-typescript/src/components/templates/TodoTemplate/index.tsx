import React, { useEffect, useState } from 'react';
import axios from 'axios';
import styles from './styles.module.scss';
import { TodoType } from 'types/TodoType';
import { getTodo } from 'apis/todos';
import { useTodo } from 'hooks/useTodo';
import Add from 'components/modules/Add';
import Search from 'components/modules/Search';
import List from 'components/modules/List';

const TodoTemplate: React.FC = () => {
  console.log('TodoTemplate レンダリング');

  // カスタムフックからロジックを受け取る
  const {
    todos,
    inputAddRef,
    addTodo,
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
      <List todos={todos} removeTodo={removeTodo} />
    </div>
  );
};

export default TodoTemplate;
