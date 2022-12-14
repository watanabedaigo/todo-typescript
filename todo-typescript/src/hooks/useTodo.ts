import React, { useEffect, useState, useRef, useCallback } from 'react';
import * as apis from 'apis/todos';
import { ulid } from 'ulid';
import { TodoType } from 'types/TodoType';

export const useTodo = () => {
  // hooks
  // useState
  // 全てのtodoを扱うstate。配列で、中身は型エイリアスTodoを型に持つオブジェクト
  const [allTodos, setAllTodos] = useState<TodoType[]>([]);
  // 未完了(done: false)のtodoを扱うstate。配列で、中身は型エイリアスTodoを型に持つオブジェクト
  const [notDoneTodos, setNotDoneTodos] = useState<TodoType[]>([]);
  // 未完了(done: true)のtodoを扱うstate。配列で、中身は型エイリアスTodoを型に持つオブジェクト
  const [doneTodos, setDoneTodos] = useState<TodoType[]>([]);

  // useEffect
  // 依存配列は空なので、初回レンダリング後に実行される
  useEffect(() => {
    // クリーンアップ関数（React v18対応）
    let unmounted = false;

    // GET
    // データ取得の関数
    const fetchData = async () => {
      apis
        .getTodo()
        .then((todosData) => {
          if (!unmounted) {
            // 抽出、State更新
            filterTodo(todosData);

            // State更新
            setAllTodos([...todosData]);
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

  // 関数
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
    apis
      .postTodo(newTodo)
      .then((newTodo) => {
        // State更新
        setAllTodos([...allTodos, newTodo]);
        setNotDoneTodos([...notDoneTodos, newTodo]);

        // input初期化
        inputAddRef.current.value = '';
      })
      .catch((Error) => {
        console.error(Error);
      });
  };

  // PUT
  const toggleDone = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
    // ターゲットDOM取得
    const target = event.currentTarget.closest('li');

    if (target !== null) {
      // ターゲットDOMのid属性値取得
      const targetId: string = target.getAttribute('id') as string;

      //ターゲットjson取得
      const targetJson: TodoType = allTodos.find((todo) => {
        return todo.id === targetId;
      }) as TodoType;

      // ターゲットjsonのdoneを反転
      targetJson.done = !targetJson.done;

      // json変更
      apis.putTodo(targetId, targetJson);
    }

    // 抽出、State更新
    filterTodo(allTodos);
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

        // ターゲットDOMのid属性値取得
        const targetId: string = target.getAttribute('id') as string;
        // jsonから削除
        apis.deleteTodo(targetId);
      }
    },
    []
  );

  // search
  const searchTodo = () => {
    // 入力値取得
    let value = inputSearchRef.current.value;

    // 検索ワードを含むもののみ、notDoneTodosから抽出
    const targetNotDoneTodos = notDoneTodos.filter((todo) => {
      return todo.content.indexOf(value) !== -1;
    });

    // State更新
    setNotDoneTodos([...targetNotDoneTodos]);

    // 検索ワードを含むもののみ、doneTodosから抽出
    const targetDoneTodos = doneTodos.filter((todo) => {
      return todo.content.indexOf(value) !== -1;
    });

    // State更新
    setDoneTodos([...targetDoneTodos]);

    // input初期化
    inputSearchRef.current.value = '';
  };

  // reset
  const resetTodo = () => {
    // 抽出
    filterTodo(allTodos);

    // input初期化
    inputSearchRef.current.value = '';
  };

  // 未完了または完了のみを、引数で渡したtodoの配列から抽出し、Stateを更新
  const filterTodo = (data: TodoType[]) => {
    // 未完了のみ抽出
    const notDoneTodos = data.filter((todo) => {
      return todo.done === false;
    });

    // State更新
    setNotDoneTodos([...notDoneTodos]);

    // 完了のみ抽出
    const doneTodos = data.filter((todo) => {
      return todo.done === true;
    });

    // State更新
    setDoneTodos([...doneTodos]);
  };

  return {
    allTodos,
    notDoneTodos,
    doneTodos,
    setNotDoneTodos,
    setDoneTodos,
    inputAddRef,
    addTodo,
    toggleDone,
    removeTodo,
    inputSearchRef,
    searchTodo,
    resetTodo,
  };
};
