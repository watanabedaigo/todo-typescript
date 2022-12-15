import React, { useEffect, useState } from 'react';
import styles from './styles.module.scss';
import { useTodo } from 'hooks/useTodo';
import { Link } from 'react-router-dom';

const DetailTemplate: React.FC = () => {
  console.log('DetailTemplate レンダリング');

  // カスタムフックからロジックを受け取る
  const { getTargetJson } = useTodo();

  // 関数の戻り値を変数に格納
  const targetJson = getTargetJson();

  // 変数がundefinedの場合があるので、条件分岐で対応
  if (targetJson !== undefined) {
    return (
      <div>
        <p>{targetJson.content}</p>
        <p>
          <Link to={'/'}>to TodoPage</Link>
        </p>
      </div>
    );
  } else {
    return (
      <div>
        <p>DetailTemplate</p>
      </div>
    );
  }
};

export default DetailTemplate;
