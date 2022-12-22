import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { useTodo } from 'hooks/useTodo';
import Add from 'components/modules/Add';

const EditTemplate: React.FC = () => {
  console.log('EditTemplate レンダリング');

  // カスタムフックからロジックを受け取る
  const { getTargetJson, inputRef, updateContent, getInputValue } = useTodo();

  // 関数の戻り値を変数に格納
  const targetJson = getTargetJson();

  // 変数がundefinedの場合があるので、条件分岐で対応
  if (targetJson !== undefined) {
    return (
      <div>
        <p>{targetJson.content}</p>
        <Add
          inputRef={inputRef}
          callback={updateContent}
          label="編集"
          initValue={targetJson.content}
          getInputValue={getInputValue}
        />
      </div>
    );
  } else {
    return <div></div>;
  }
};

export default EditTemplate;
