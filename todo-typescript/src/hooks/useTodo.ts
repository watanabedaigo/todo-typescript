import React, { useEffect, useState, useRef, useCallback } from 'react';
import { getTodo } from 'apis/todos';
import { postTodo } from 'apis/todos';
import { deleteTodo } from 'apis/todos';
import { ulid } from 'ulid';
import { TodoType } from 'types/TodoType';

export const useTodo = () => {
  // hooks
  // useState
  // 表示するtodoを扱うstate。配列で、中身は型エイリアスTodoを型に持つオブジェクト
  const [todos, setTodos] = useState<TodoType[]>([]);
  // 初期取得時のtodoを扱うstate。配列で、中身は型エイリアスTodoを型に持つオブジェクト
  const [initialTodos, setInitialTodos] = useState<TodoType[]>([]);

  // useEffect
  // 依存配列は空なので、初回レンダリング後に実行される
  useEffect(() => {
    // クリーンアップ関数
    let unmounted = false;

    // GET
    // データ取得の関数
    const fetchData = async () => {
      getTodo()
        .then((todosData) => {
          if (!unmounted) {
            setTodos([...todosData]);
            setInitialTodos([...todosData]);
          }
        })
        .catch((Error) => {
          console.error(Error);
        });
    };
    fetchData();

    return () => {
      unmounted = true;
    };
  }, []);

  // useRef
  // 追加用のinput
  const inputAddRef = useRef<HTMLInputElement>(null!);
  // 検索用のinput
  const inputSearchRef = useRef<HTMLInputElement>(null!);

  // functions
  // propsで渡すためメモ化、useCallbackの依存配列にstate指定しないといけないためメモ化意味なし？
  // Post
  const addTodo = () => {
    // 入力値取得
    let value = inputAddRef.current.value;

    // 追加データをオブジェクトで作成
    const newTodo: TodoType = {
      id: ulid(),
      content: value,
      done: false,
    };

    // jsonに追加
    postTodo(newTodo)
      .then((newTodo) => {
        // State更新
        setTodos([...todos, newTodo]);
        // input初期化
        inputAddRef.current.value = '';
      })
      .catch((Error) => {
        console.error(Error);
      });
  };

  // DELETE
  const removeTodo = useCallback(
    (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
      // ターゲットDOM取得
      const target = event.currentTarget.closest('li');

      // ターゲット取得後の処理
      if (target !== null) {
        // DOMから削除
        target.remove();

        // jsonから削除
        const targetId: string = target.getAttribute('id') as string;
        deleteTodo(targetId);
      }
    },
    []
  );

  // search
  const searchTodo = () => {
    // 入力値取得
    let value = inputSearchRef.current.value;

    // 検索ワードを含むもののみ、todosから抽出
    const targetTodos = todos.filter((todo) => {
      return todo.content.indexOf(value) !== -1;
    });

    // State更新
    setTodos([...targetTodos]);

    // input初期化
    inputSearchRef.current.value = '';
  };

  // reset
  const resetTodo = () => {
    // 表示用のState(todos)を、初期取得時のState(initialTodos)で更新
    setTodos([...initialTodos]);

    // input初期化
    inputSearchRef.current.value = '';
  };

  return {
    todos,
    inputAddRef,
    addTodo,
    removeTodo,
    inputSearchRef,
    searchTodo,
    resetTodo,
  };
};
