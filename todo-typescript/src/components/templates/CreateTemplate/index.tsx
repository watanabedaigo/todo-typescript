import React, { useEffect, useState } from 'react';
import { useTodo } from 'hooks/useTodo';
import Add from 'components/modules/Add';

const CreateTemplate: React.FC = () => {
  console.log('CreateTemplate レンダリング');

  // カスタムフックからロジックを受け取る
  const { inputAddRef, addTodo } = useTodo();

  return (
    <div>
      <Add
        inputAddRef={inputAddRef}
        addTodo={addTodo}
        placeholder="todoを入力"
        value="追加"
      />
    </div>
  );
};

export default CreateTemplate;
