import React from 'react';
import {
  act,
  renderHook,
  render,
  screen,
  fireEvent,
  waitFor,
} from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { createMemoryHistory } from 'history';
import { useTodo } from './useTodo';
import CreatePage from 'pages/CreatePage';
import EditPage from 'pages/EditPage';
import TodoPage from 'pages/TodoPage';
import { BrowserRouter, MemoryRouter, Routes, Route } from 'react-router-dom';
import '@testing-library/jest-dom';

// カウタムフックテスト
describe('useTodo', () => {
  describe('関数（api関係）', () => {
    describe('【関数テスト】fetchTodo', () => {
      it('データを取得し、DOMに反映される', async () => {
        // hookをレンダー
        const { result } = renderHook(() => useTodo());
        // fetchTodo実行
        result.current.fetchTodo(false);
        // 該当コンポーネントをレンダリング
        render(
          <BrowserRouter>
            <TodoPage />
          </BrowserRouter>
        );
        // 非同期処理の結果を待ちたいので、waitForを用いる
        await waitFor(() => {
          // 検証のターゲットを取得
          const target = screen.getByText('fetchTodo test');
          // 結果確認
          expect(target).toBeTruthy();
        });
      });
    });

    describe('【関数テスト】addTodo', () => {
      it('データを追加し、DOMに反映される / データ追加後に、フォームが空になっている', async () => {
        // hookをレンダー
        const { result } = renderHook(() => useTodo());

        // データを追加し、DOMに反映される
        // 新規追加する内容を変数で管理。ユニークな値を持たせるために、追加した日時を入れる
        const time = new Date();
        const month = time.getMonth() + 1;
        const day = time.getDate();
        const newTodo = `addTodo test by${month}/${day}`;
        // act()で囲むことで、hookで管理しているstateが更新されDOMに反映されることが保証される
        act(() => {
          // state更新
          result.current.setInputValue(newTodo);
        });
        // addTodo実行
        result.current.addTodo();
        // 該当コンポーネントをレンダリング
        render(
          <BrowserRouter>
            <TodoPage />
          </BrowserRouter>
        );
        // 非同期処理の結果を待ちたいので、waitForを用いる
        await waitFor(() => {
          // 検証のターゲットを取得
          const target = screen.getByText(newTodo);
          // 結果確認
          expect(target).toBeTruthy();
        });

        // データ追加後に、フォームが空になっている
        // 該当コンポーネントをレンダリング
        render(
          <BrowserRouter>
            <CreatePage />
          </BrowserRouter>
        );
        // 非同期処理の結果を待ちたいので、waitForを用いる
        await waitFor(() => {
          // 検証のターゲットを取得
          const target = screen.getByPlaceholderText(
            /todoを入力/i
          ) as HTMLInputElement;
          // 結果確認
          expect(target.value).toBe('');
        });
      });
    });

    describe('【関数テスト】updateDone', () => {
      it('データを更新し、doneが反転する', async () => {
        // 該当コンポーネントをレンダリング
        render(
          <BrowserRouter>
            <TodoPage />
          </BrowserRouter>
        );
        // 非同期処理の結果を待ちたいので、waitForを用いる
        await waitFor(() => {
          // 全ての「完了へ」ボタンを配列で取得
          const targets = screen.getAllByText('完了へ') as HTMLButtonElement[];
          // 配列に対して繰り返し処理
          for (let target of targets) {
            // クリックイベント実行、doneをfalse→trueに変更
            fireEvent.click(target);
          }
          // 全ての要素が完了へ移動しているはずなので、「完了へ」ボタンは存在しないことを確認
          // 検証のターゲットを取得、存在しないことを確認したいため、エラーが投げられないようにgetByではなくqueryByを用いる
          const target = screen.queryByText('完了へ');
          // 結果確認
          // queryByでは要素がなかった場合にnullが返ってくるので、toBeNullで確認
          expect(target).toBeNull();
        });
      });
    });

    describe('【関数テスト】updateContent', () => {
      it('データを更新し、変更内容が反映される', async () => {
        // // ---
        // // hookをレンダー
        // const { result } = renderHook(() => useTodo());
        // // fetchTodo実行
        // result.current.fetchTodo(false);
        // // 該当コンポーネントをレンダリング
        // render(
        //   <BrowserRouter>
        //     <TodoPage />
        //   </BrowserRouter>
        // );
        // // 非同期処理の結果を待ちたいので、waitForを用いる
        // await waitFor(() => {
        //   // 検証のターゲットを取得
        //   const target = screen.getByTestId('updateContent-test');
        //   // クリックイベント実行、編集ページに遷移
        //   fireEvent.click(target);
        // });
        // // ---
        // // ---
        // // hookをレンダー
        // const { result } = renderHook(() => useTodo());
        // // fetchTodo実行
        // result.current.fetchTodo(false);
        // render(<TodoPage />, { wrapper: BrowserRouter });
        // const user = userEvent.setup();
        // // 非同期処理の結果を待ちたいので、waitForを用いる
        // await waitFor(() => {
        //   // 検証のターゲットを取得
        //   const target = screen.getByTestId('updateContent-test');
        //   // クリックイベント実行、編集ページに遷移
        //   userEvent.click(target);
        // });
        // await waitFor(() => {
        //   // 予想される要素
        //   const expectValue = screen.getByText('トップ');
        //   // 結果確認
        //   expect(expectValue).toBeTruthy();
        // });
        // // ---
      });
    });
    describe('【関数テスト】removeTodo', () => {
      it('データを削除し、DOMに反映される', async () => {
        // 該当コンポーネントをレンダリング
        render(
          <BrowserRouter>
            <TodoPage />
          </BrowserRouter>
        );
        // 削除する内容を変数で管理。ユニークな値を持たせるために、追加した日時を入れる
        const time = new Date();
        const month = time.getMonth() + 1;
        const day = time.getDate();
        const deleteTodo = `addTodo test by${month}/${day}`;
        // 非同期処理の結果を待ちたいので、waitForを用いる
        await waitFor(() => {
          // 削除する内容に対応するボタンを取得
          const target = screen
            .getByText(deleteTodo)
            .closest('li')
            ?.querySelector('button') as HTMLButtonElement;
          // イベント発火、要素削除
          fireEvent.click(target);
          // 検証のターゲットを取得
          const targetItem = screen.queryByText(deleteTodo);
          // 結果確認
          expect(targetItem).toBeNull();
        });
      });
    });
  });

  describe('関数（api以外）', () => {
    describe('【関数テスト】searchTodo', () => {
      it('データを検索し、DOMに反映される', async () => {
        // // hookをレンダー
        // const { result } = renderHook(() => useTodo());
        // // fetchTodo実行
        // result.current.fetchTodo(false);
        // // 該当コンポーネントをレンダリング
        // render(
        //   <BrowserRouter>
        //     <TodoPage />
        //   </BrowserRouter>
        // );
        // // 非同期処理の結果を待ちたいので、waitForを用いる
        // await waitFor(() => {
        //   // act()で囲むことで、hookで管理しているstateが更新されDOMに反映されることが保証される
        //   act(() => {
        //     // 検索する文字列を変数で管理
        //     const searchValue = 'search';
        //     // state更新
        //     result.current.setInputValue(searchValue);
        //     // searchTodo実行
        //     result.current.searchTodo();
        //   });
        //   // 検証のターゲットを取得
        //   const target = screen.getByText('fetchTod test');
        //   // 結果確認
        //   expect(target).toBeTruthy();
        // });
      });
    });
    describe('【関数テスト】resetTodo', () => {
      it('検索条件をクリアし、全データが表示される', () => {});
    });
  });
});

// テスト実行環境確認用テスト
// describe('CreatePage', () => {
//   // input要素に文字列を入力した際、入力した値が表示されているか確認
//   it('InputForm value change', () => {
//     // 該当コンポーネントをレンダリング
//     render(
//       <BrowserRouter>
//         <CreatePage />
//       </BrowserRouter>
//     );
//     // 対象の要素を取得
//     const inputElement = screen.getByPlaceholderText(
//       /todoを入力/i
//     ) as HTMLInputElement;
//     // changeイベント登録。input要素にテキストを入力
//     fireEvent.change(inputElement, {
//       target: { value: 'test' },
//     });
//     // 結果確認
//     expect(inputElement.value).toBe('test');
//   });
// });
