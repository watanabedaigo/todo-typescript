import React, { useEffect, useState } from 'react';
import { useTodo } from 'hooks/useTodo';
import { Link } from 'react-router-dom';
import Add from 'components/modules/Add';
import Search from 'components/modules/Search';
import List from 'components/modules/List';
import { TodoType } from 'types/TodoType';
import TodoPage from 'pages/TodoPage';

const EditTemplate: React.FC = () => {
  console.log('EditTemplate レンダリング');

  // カスタムフックからロジックを受け取る
  const { getTargetJson, inputAddRef, addTodo } = useTodo();

  // 関数の戻り値を変数に格納
  const targetJson = getTargetJson();

  // 変数がundefinedの場合があるので、条件分岐で対応
  if (targetJson !== undefined) {
    return (
      <div>
        <p>{targetJson.content}</p>
        <Add
          inputAddRef={inputAddRef}
          addTodo={addTodo}
          placeholder={targetJson.content}
          value="編集"
        />
      </div>
    );
  } else {
    return (
      <div>
        <p>EditTemplate</p>
      </div>
    );
  }
};

export default EditTemplate;
