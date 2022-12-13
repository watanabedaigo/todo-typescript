import React from 'react';
import TodoTemplate from 'components/templates/TodoTemplate';

const TodoPage: React.FC<{}> = () => {
  console.log('TodoPage レンダリング');

  return <TodoTemplate />;
};

export default TodoPage;
