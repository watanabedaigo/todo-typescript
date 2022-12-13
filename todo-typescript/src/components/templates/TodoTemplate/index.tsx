import React, { useEffect, useState, createContext } from 'react';
import Add from 'components/modules/Add';
import List from 'components/modules/List';
import TodoTemplateProvider from 'providers/TodoTemplateProvider';

const TodoTemplate: React.FC = React.memo(() => {
  console.log('TodoTemplate レンダリング');

  return (
    <div>
      <TodoTemplateProvider>
        <Add />
        <List />
      </TodoTemplateProvider>
    </div>
  );
});

export default TodoTemplate;
