import { useEffect, useState, useRef, useCallback } from 'react';
import * as apis from 'apis/todos';
import { ulid } from 'ulid';
import { TodoType } from 'types/TodoType';
import { EventType } from 'types/EventType';

export const useTodo = () => {
  // hooks
  // useState
  // 全てのtodoを扱うstate。配列で、中身は型エイリアスTodoを型に持つオブジェクト。初期値は空の配列。
  const [allTodos, setAllTodos] = useState<TodoType[]>([]);
  // 未完了(done: false)のtodoを扱うstate。配列で、中身は型エイリアスTodoを型に持つオブジェクト。初期値は空の配列。
  const [notDoneTodos, setNotDoneTodos] = useState<TodoType[]>([]);
  // 未完了(done: true)のtodoを扱うstate。配列で、中身は型エイリアスTodoを型に持つオブジェクト。初期値は空の配列。
  const [doneTodos, setDoneTodos] = useState<TodoType[]>([]);
  // フォームで入力された内容を扱うstate。文字列。初期値は空の文字列。
  const [inputValue, setInputValue] = useState<string>('');

  // useEffect
  // 依存配列は空なので、初回レンダリング後に実行される
  useEffect(() => {
    // クリーンアップ関数（React v18対応）
    let unmounted = false;

    fetchTodo(unmounted);

    return () => {
      unmounted = true;
    };
  }, []);

  // useRef
  // 追加用のinput
  const inputRef = useRef<HTMLInputElement>(null!);
  // 検索用のinput
  const inputSearchRef = useRef<HTMLInputElement>(null!);

  // 関数（api関係）
  // GET
  const fetchTodo = async (unmounted: boolean) => {
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

  // POST
  const addTodo = () => {
    // 追加データをオブジェクトで作成
    const newTodo: TodoType = {
      id: ulid(),
      content: inputValue,
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
        setInputValue('');
        inputRef.current.value = '';
      })
      .catch((Error) => {
        console.error(Error);
      });
  };

  // PUT（doneプロパティ）
  const updateDone = (event: EventType) => {
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

  // PUT（contentプロパティ）
  const updateContent = (event: EventType) => {
    // ターゲットDOM取得
    const target: TodoType = getTargetJson();

    // ターゲットjsonのcontentを上書き
    target.content = inputValue;

    // json変更
    apis.putTodo(target.id, target);

    // input初期化
    setInputValue('');
    inputRef.current.value = '';
  };

  // DELETE
  const removeTodo = useCallback((event: EventType) => {
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
  }, []);

  // 関数（api以外）
  // inputに入力された値を取得
  const getInputValue = (event: EventType) => {
    // event.currentTarget.valueでエラーが出ないようにtypeguard
    if (event.currentTarget instanceof HTMLInputElement) {
      const target = event.currentTarget;
      setInputValue(target.value);
    }
  };

  // search
  const searchTodo = () => {
    // 検索ワードを含むもののみ、notDoneTodosから抽出
    const targetNotDoneTodos = notDoneTodos.filter((todo) => {
      return todo.content.indexOf(inputValue) !== -1;
    });

    // State更新
    setNotDoneTodos([...targetNotDoneTodos]);

    // 検索ワードを含むもののみ、doneTodosから抽出
    const targetDoneTodos = doneTodos.filter((todo) => {
      return todo.content.indexOf(inputValue) !== -1;
    });

    // State更新
    setDoneTodos([...targetDoneTodos]);

    // input初期化
    setInputValue('');
  };

  // reset
  const resetTodo = () => {
    // 抽出
    filterTodo(allTodos);

    // input初期化
    setInputValue('');
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

  // パスからidを切り取り、そのidから該当のjsonデータを取得
  const getTargetJson = () => {
    // URLのパス取得
    const path = window.location.pathname;

    // パスからid取得
    // /の位置をインデックス番号で取得
    const firstSlashIndex = path.indexOf('/');
    const secondSlashIndex = path.indexOf('/', firstSlashIndex + 1);
    const idStartIndex = secondSlashIndex + 1;

    // sliceでid部分のみ切り取り
    const targetId = path.slice(idStartIndex);

    // idから該当のjsonデータを抽出
    const target: TodoType = allTodos.find((todo) => {
      return todo.id === targetId;
    }) as TodoType;

    return target;
  };

  return {
    allTodos,
    setAllTodos,
    notDoneTodos,
    doneTodos,
    setNotDoneTodos,
    setDoneTodos,
    setInputValue,
    inputRef,
    fetchTodo,
    addTodo,
    updateDone,
    updateContent,
    removeTodo,
    inputSearchRef,
    getInputValue,
    searchTodo,
    resetTodo,
    filterTodo,
    getTargetJson,
  };
};
