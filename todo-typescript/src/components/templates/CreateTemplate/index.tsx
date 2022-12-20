import React, { useEffect, useState } from 'react';
import { useTodo } from 'hooks/useTodo';
import styles from './styles.module.scss';
import Add from 'components/modules/Add';

const CreateTemplate: React.FC = () => {
  console.log('CreateTemplate レンダリング');

  // カスタムフックからロジックを受け取る
  const { inputRef, addTodo, getInputValue } = useTodo();

  return (
    <div>
      <Add
        inputRef={inputRef}
        callback={addTodo}
        getInputValue={getInputValue}
        label="追加"
      />
    </div>
  );
};

export default CreateTemplate;
